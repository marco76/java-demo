# Build your docker deliverable with Jenkins

In the general overview of our Jenkins Pipeline we saw that Jenkins build the docker image that will be delivered to the cloud.

![alt text]([p]BACKEND_URL[/p]/images/jenkins-docker.png)

## Include your artifact in the docker image

In the pipeline of Jenkins when the jar/war artifact is ready we can include it in  a docker image that will start the application.

As image we use the official [Open JDK Docker Image](https://hub.docker.com/_/openjdk/).

If you need the Oracle Java JDK you have to prepare the docker image yourself.
Oracle JDK has licences constraints for his distributions and it cannot be included in docker images freely downloadable.

We chose to use the Alpine edition of the JDK to reduce the size of the deliverable. 

### Custom WildFly build

The specification of Java EE 8 is in finalisation phase and there is still a lot to do on the side of the Application Servers.

For this demo we use WildFly 10.1.0 personally patched with the single JSR implementations (in beta) of Java EE 8.

We use a self-built server, not officially supported by anybody. 
Some instability and issues are probable and not related to the original product. 

WildFly is used and not GlassFish simply because the original idea was to show some BeanValidation 2.0 features and a patch for WildFly was available.

## How to deploy your war application in a Docker WildFly

I show here a simple use case that works well for the deployment of this web application.

An existing docker image of WildFly is enriched with the war of our application and a new Docker image is built.
At the deploy of the container the application starts automatically.

```docker
FROM javaee/wildfly-10.1.0-custom-patched:latest

MAINTAINER "Marco Molteni <moltenma@gmail.com>"

ADD /config/jboss/standalone.xml /opt/wildfly/standalone/configuration/

ADD server/target/ROOT.war /opt/wildfly/standalone/deployments/ROOT.war

WORKDIR /opt/wildfly/

CMD ["/opt/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-Djboss.http.port=80"]

EXPOSE 80
```

The Dockerfile is really short and easy to understand. What is important to note is the _ADD_ instruction.
We are copying the deliverable created during the previous Jenkins step from the Jenkins server to the docker image.

The _CMD_ instructions will be executed only when the docker image will be instantiated as container: ``docker run --rm -it -p 80:8080  javaee/java-demo``

### Adapt the solution to your context!

As said, this is a simple use case for the our demo. In your company you should find a solution that better follow the pipeline / tools defined.
A good solution e.g. would be to have a running container with the application server and simply redeploy the application in a [docker volume](https://docs.docker.com/engine/admin/volumes/volumes/).

## Build all from the code source in a clean OS (Alpine / Ubuntu)

An alternative to the previous 'light' deploy is to create a docker image that build the application from the code source in an empty environment.
This solution is good to verify that our application can be built from scratch without any potential dependency issue (cache, library version etc) with our Jenkins environment.

The full build is maybe the only option you don't use Jenkis but you build the image directly in Docker Cloud or AWS.

Here an example that contains the full process of building and deploying the application starting from an empty OS and the GitHub sources:

```docker
FROM openjdk:8u102-jdk
FROM maven:3.3.9-jdk-8

MAINTAINER "Marco Molteni <moltenma@gmail.com>"

# set the path JAVA_HOME for maven
RUN export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64

# install git from debian repositories
RUN apt-get install -y git

# set the path of the working dir
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

# install node.js
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

# clone the repository with the code
RUN git clone -b stable git://github.com/marco76/java-demo.git

# install npm modules
WORKDIR /usr/src/myapp/java-demo/
RUN npm install -g @angular/cli
RUN mvn generate-resources package

# install WildFly (patched custom version)
RUN mkdir /opt/wildfly
WORKDIR /opt/wildfly
RUN wget https://s3.eu-central-1.amazonaws.com/molteni/java-demo/wildfly-custom/wildfly-11.0.0.Beta1-SNAPSHOT.tar.gz
#RUN wget https://drive.google.com/uc?id=0B1OW861bv3wvTFBXc2tHd0t4N0E&export=download
RUN tar xzf ./wildfly-11.0.0.Beta1-SNAPSHOT.tar.gz

RUN yes | cp -rf /usr/src/myapp/java-demo/server/target/ROOT.war /opt/wildfly/wildfly-11.0.0.Beta1-SNAPSHOT/standalone/deployments/

# This will boot WildFly in the standalone mode and bind to all interfaces
CMD ["/opt/wildfly/wildfly-11.0.0.Beta1-SNAPSHOT/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-Djboss.http.port=80"]

EXPOSE 80
####
# build with:
# docker build -t javaee/java-demo .
#
# run with:
# docker run --rm -it -p 80:80  javaee/java-demo
```
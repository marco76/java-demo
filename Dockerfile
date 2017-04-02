FROM openjdk:8u102-jdk
FROM maven:3.3.9-jdk-8

MAINTAINER "Marco Molteni <javaee.ch>"

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

# install WildFly (patched custom version)
RUN wget https://s3.eu-central-1.amazonaws.com/molteni/java-demo/wildfly-custom/wildfly-11.0.0.Beta1-SNAPSHOT.tar.gz
RUN tar xzf ./wildfly-11.0.0.Beta1-SNAPSHOT.tar.gz

# clone the repository with the code
RUN git clone git://github.com/marco76/SpringAngular2TypeScript.git

# install npm modules
WORKDIR /usr/src/myapp/SpringAngular2TypeScript/
RUN mvn generate-resources package

RUN yes | cp -rf /usr/src/myapp/SpringAngular2TypeScript/server/target/server-0.1.4-SNAPSHOT.war /usr/src/myapp

CMD ["java", "-jar", "/usr/src/myapp/server-0.1.4-SNAPSHOT.war"]
# tomcat manual config
#RUN yes | cp -rf /usr/src/myapp/SpringAngular2TypeScript/webClient/target/client-0.1-SNAPSHOT.war /usr/src/myapp/apache-tomcat-8.5.5/webapps/ROOT.war
#WORKDIR /usr/src/myapp/apache-tomcat-8.5.5/bin
#RUN catalina.sh start &

####
# build with:
# docker -t angular2-java-hello-world .
# run with:
# docker run --rm -it -p 8080:8080  angular2-java-hello-world java -jar /usr/src/myapp/server-0.1.3-SNAPSHOT.war
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
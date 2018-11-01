FROM jboss/wildfly:14.0.1.Final

MAINTAINER "Marco Molteni <moltenma@gmail.com>"

ADD server/target/ROOT.war /opt/jboss/wildfly/standalone/deployments/

WORKDIR /opt/jboss/wildfly/

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]

### To build and deploy ###
# build local
# docker build -t javaee/javaee-server .

# test locally
# docker run -it -p 8080:8080 javaee/javaee-server

# push to docker hub
# docker push javaee/javaee-server
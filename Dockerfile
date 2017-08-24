FROM javaee/wildfly-10.1.0-custom-patched:latest

MAINTAINER "Marco Molteni <moltenma@gmail.com>"

ADD /config/jboss/standalone.xml /opt/wildfly/standalone/configuration/

ADD server/target/ROOT.war /opt/wildfly/standalone/deployments/ROOT.war

WORKDIR /opt/wildfly/

CMD ["/opt/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-Djboss.http.port=80"]

EXPOSE 80
FROM jboss/wildfly

MAINTAINER "Marco Molteni <moltenma@gmail.com>"

ADD server/target/ROOT.war /opt/jboss/wildfly/standalone/deployments/

WORKDIR /opt/jboss/wildfly/

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-Dee8.preview.mode=true", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
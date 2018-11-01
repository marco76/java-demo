FROM jboss/wildfly

MAINTAINER "Marco Molteni <moltenma@gmail.com>"

ADD server/target/ROOT.war /opt/jboss/wildfly/standalone/deployments/

WORKDIR /opt/jboss/wildfly/

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
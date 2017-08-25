# Test Java EE 8 (CDI, Bean Validation) with WildFly

## Goal

The goal is to build an unofficial version of WildFly that supports some features of Java EE 8.
This version allows the developers to test the new JSRs implementations without waiting the release of a new official version of WildFly.

This WildFly version is based on the release 10.1.0.Final and it is used to deploy the demo: <http://javademo.io>

## Java EE 8 JSR Supported

The current version of WildFly is patched with:

- JSR 370 (CDI 2.0 - Weld 3.0.0). The official Weld 3.0.0.Final.Patch is used.
- JSR 380 (Bean Validation 2.0 - Hibernate Validator 6.0.0). The official hibernate-validator-6.0.0.Beta2 patch is used.

Other patches will be applied when available.

The following JSRs can be integrated directly in your application (with some restrictions):
- JSR 367 (JSON-B)
- JSR 375 (Security - Soteria) [[1]](#1)

## Patch WildFly using Docker

We use a docker image to build the patched WildFly version and copy it to our system.
If you don't want to use docker you can simply execute the commands that you find in the Dockerfile.

The commands have to be executed in the directory containing the Dockerfile. A new WildFly version will be created the current directory.

Build the docker image and create the WildFly patched version
- ```docker build -t javaee/wildfly-javaee8 .```

Start the docker image
- ```docker run -d --name wildfly-javaee8 javaee/wildfly-javaee8```

Copy wildfly to the current directory in the host system
- ```docker cp wildfly-javaee8:/app/wildfly-10.1.0.Patched.tar.gz .```

Clean up
- ```docker rmi javaee/wildfly-javaee8 -f```
- ```docker rm -f wildfly-javaee8```

## Built version
A build version can be found here : https://s3.eu-central-1.amazonaws.com/io.javademo/wildfly-10.1.0.Patched.tar.gz

## Extend WildFly with your own libraries
In this excellent article you can find more information about how to create patches and extend WildFly with your own libraries.
http://in.relation.to/2017/05/29/creating-patches-for-wildfly/

## Notes
<a name="1">[1]</a>: An update of the jboss-classfilewriter version delivered with WildFly is required. [Soteria Issue 21.](<https://github.com/javaee-security-spec/soteria/issues/21>)

You can find the classfilewriter here: [wildfly]/modules/system/layers/base/org/jboss/classfilewriter/main

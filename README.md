# Java EE 8 Demo with Angular

The scope of the application is to show the new features of the next version of Java EE.
Angular 4 (Angular CLI) is used to communicate with the server.
This architecture is one of the most common in the professional environnements:
Java EE <--> REST Services <--> Angular (JS Framework)


## Features


- Java EE 8 features
- - Bean Validation 2.0 (alpha)
- - CDI 2.0 (alpha)
- - JSONB
- Java EE 7 features
- - WebSockets


## How to install

__Prerequisites__

- you need maven, npm, git and an application server Java EE
- the demo uses some Java 8 features that are still in developement.
 At the moment it works only with __WildFly__ patched with the following instructions:
 http://in.relation.to/2017/04/04/testing-bean-validation-2-0-on-wildfly-10/ and http://weld.cdi-spec.org/news/2017/03/03/weld-300CR2/
 We will adapt to __Glassfish (RI)__ when it will support BV 2.0.


__Production mode__

- clone the git project
from the root of the project launch mvn package this generates a package named ROOT.war in the PROJECT/server/target directory
you can deploy this package in your favourite application server.
The Angular application should answer at the requests to __http://localhost:8080__
Development mode

__Development mode__

- clone the git project
You can start the server using your favourite IDE. The project uses a standard Maven directory structure. You need to configure the server to deploy the server.war artifact.
from the PROJECT/client/src directory install the npm packages : npm install
launch the client with ng serve. The client uses the port 4200 (default for Angular CLI) and you can navigate to __http://localhost:4200__

__Docker image__
 
 You can find the docker image here : https://hub.docker.com/r/javaee/java-demo/
 
 The docker image install a linux distribution, download the sources and the required libraries and application server (custom edition).
 It compiles the sources codes and deploy the application on the port 80.
 
 You can run it with this instruction: docker run --rm -it -p 80:80  javaee/java-demo
 
## How the code is organized
The code structure has been adapted to easily found the ressources of the demo and doesn't follow the best practices for an enterprise project.

The package _io.javademo.common.web_ contains common classes for the infrastructure of the project.

The package _io.javademo.examples_ contains the specific code used for each example. The code is grouped by feature (beans, DTO, resources, services together) and not on technical layers.

_UPDATES_

17.04.2017: CDI demo, refactoring server and client
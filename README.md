# Java EE 8 Demo with Angular

The scope of the application is to show the new features of the next version of Java EE.
Angular 4 (Angular CLI) is used to communicate with the server.
This architecture is one of the most common in the professional environnements:
Java EE <--> REST Services <--> Angular (JS Framework)


## Features
[...]

## How to install

__Prerequisites__

- you need maven, npm, git and an application server Java EE

__Production mode__

- clone the git project
from the root of the project launch mvn package this generates a package named ROOT.war in the PROJECT/server/target directory
you can deploy this package in your favourite application server. The Angular application should answer at the requests to http://localhost:8080
Development mode

__Development mode__

- clone the git project
You can start the server using your favourite IDE. The project uses a standard Maven directory structure. You need to configure the server to deploy the server.war artifact.
from the PROJECT/client/src directory install the npm packages : npm install
launch the client with ng serve. The client uses the port 4200 (default for Angular CLI) and you can navigate to http://localhost:4200

# Jenkins installation

This is an example of Jenkins installation done by a developer for this demo. Without any doubt your SysAdmin will do better in terms of configuration.

## Live demo

I use this installation to build and publish this website: http://javaee.cloud:8081/

I planned to build a docker image to simplify the future deployments.

## Ubuntu install

Here you can find the [Jenkins packages](https://pkg.jenkins.io/debian-stable/)

Download and install the Jenkins key:

```wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -```

Add the following entry in your /etc/apt/sources.list:

```deb https://pkg.jenkins.io/debian-stable binary/```

Update your local package index, then finally install Jenkins:

```sudo apt-get update```

```sudo apt-get install jenkins```

### Settings

Jenkins uses the port 8080 by default.
You can define a different one updating HTTP_PORT=8080 in  /etc/init.d/jenkins.

### Start and first step

You can start jenkins with : ```service jenkins restart```
Jenkins created for you the admin account and a password. You can see the password here:

```cat /var/lib/jenkins/secrets/initialAdminPassword```

### To build your application ...

Jenkins needs the access to Java, Maven and NodeJS, Git to build the applications.

Here a quick example of basic install of required packages:

```bash
sudo apt-get install curl openjdk-8-jdk
sudo apt-get install git
sudo apt install maven

cd /var/tmp
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
apt install nodejs-legacy

sudo apt-get install npm
```

### Extra

A daemon is created: /etc/init.d/jenkins
A jenkins user is added to the system.

### Todo

Prepare a Docker version.
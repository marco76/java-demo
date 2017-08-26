# Build, test and deploy with Jenkins

To build and deploy this website we use Jenkins (available here: javaee.cloud:8081/job/java-demo-pipeline/)

![alt text]([p]BACKEND_URL[/p]/images/jenkins-pipeline.png)

## Automatically build after GitHub commits

Install the [GitHub plugin in Jenkins](https://wiki.jenkins.io/display/JENKINS/Github+Plugin).

In your the Jenkins pipeline configuration of your project select the option 'GitHub hook trigger for GITScm polling'.
 
![alt text]([p]BACKEND_URL[/p]/images/jenkins-githook.png)

You have to add a WebHook to your GitHub project that points to your Jenkins installation.

![alt text]([p]BACKEND_URL[/p]/images/github-hook.png)

## Jenkins Pipeline Script

![alt text]([p]BACKEND_URL[/p]/images/jenkins-build.png)

In the pipeline we use the following script, the credentials for Docker Hub / Docker Cloud are stored in Jenkins.

- *Build from GitHub* : The first step is to download the sources from GitHub and build the project

- *SonarQube analysis* : the SonarQube analysis is created, we didn't create any Quality Wall at the moment. It's possible to block the deploy if certain criteria are not fulfilled (code coverage, etc)

- *Build Docker image* : we build the docker image. We chose to completely rebuild the project and not only to deploy the deliverable. It requires a bit more time and ressources but it's a background process. The advantage is that the build and execution environment are the same. We will add a test to be sure that environment starts correctly.

- *Push Docker Image to Docker Cloud* : When the Docker image is built it is transferedd to Docker Cloud that automatically will deploy the image in our target server. We use a custom Linux Server based on Debian 8 but it could be Amazon AWS or Microsoft Azure. The details will follow in a future chapter.

```groovy
def dockerImage

node {
    stage ('Build from GitHub') {
    git branch: 'master', url: 'https://github.com/marco76/java-demo.git';
    sh 'mvn clean install';
    archiveArtifacts 'server/target/*.war';      
    }
     
stage('SonarQube analysis') {
    withSonarQubeEnv('SonarQube Local') {
    sh 'mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.2:sonar'
 }
}

stage('Build Docker image') {
    sh 'docker system prune -a -f';
     dockerImage = docker.build('javaee/java-demo', '.');
}
stage('Push Docker Image to Docker Cloud')
  docker.withRegistry('https://registry.hub.docker.com', 'docker-hub')
    {
        dockerImage.push("${env.BUILD_NUMBER}");
        dockerImage.push("latest");
    } 
}
```
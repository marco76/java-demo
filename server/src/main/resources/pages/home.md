# Java, Angular, Cloud
## How to build a professional application step by step

This website is like a programming book but it's live and it's working.

I'm trying to collect the good practices and code fragments frequently used during the development of a professional application.

These good practices are used in a real work application ... this website.
If the solutions proposed don't work (anymore), this website will simply disappear.

> Why I should write about the productivity of Java and Angular
> using a PHP or Ruby framework ?
>
> _Java a great productivity and my (our? ;)) goal is to show it_.

## How much time do you spend searching on technical forums?

Most of the projects are technically similar and when I change project or client I have to search again and again the solution for the same problems.

StackOverflow and similar are fundamental in the daily life of a developer but it can take time to filter hundred of answers and find the solution that is good in quality (and not simply a workaround), up-to-date and works with your libraries.

My goal is to reduce the time spent looking for common technical problems (e.g. 'Why when I refresh the page I get a 404 error?') to improve the quality of the modern applications.

## Topics and architecture

Topics of this section are:

- Development
- Tools
- Testing
- Coding
- Deployment
- Delivery
- Documentation
- Code quality

![alt text]([p]BACKEND_URL[/p]/images/architecture.png)

Central topics are code quality and code delivery.
Usually in a project the biggest costs are directly related to the complexity in every phase of the process.
The complexity becomes high maintenance costs and limited adaptability.

## Simplicity and Continuous integration

The goal of this example is show a way to reduce the complexity in the lifecycle of software development.
We will privilege the simplicity over the powerfulness of the components (e.g. docker vs kubernetes, bootstrap vs material design, IntelliJ vs. Eclipse).

The result will be a software development process that will allow to build, validate and deploy the software automatically.
Our goal is an architecture that can be easily maintaned by a small team of developers and with a low entry barrier the developers than in the future will take the relay.

## Which technologies

The technologies used are the following:
- GitHub ([https://github.com/marco76/java-demo](https://github.com/marco76/java-demo))
- Java EE 8 preview (last available version)
- Angular (last available version)
- Jenkins 2.0 ([Visible here](http://javaee.cloud:8081/job/java-demo-io-pipeline/))
- SonarQube ([Visible here](http://javaee.cloud:9000/dashboard?id=java-demo%3Aparent))
- Docker Hub ([Here][https://hub.docker.com/r/javaee/java-demo/])
- [Rancher](http://rancher.com) for the automated deploy to the cloud
- IntelliJ and VisualStudio Code
- Swagger
- Bootstrap

## Spring Boot? Angular Material?

I built something similar for Spring Boot and Angular Material.
You can find it here: http://molteni.io

## A blog is not enough??

On the long term the content of a blog can be thrown away, it make no sense to update the articles and it is very hard to maintain the consistency.
The only advantage of a blog is that is very good for SEO. JS frameworks are not SEO friendly. 

I still hava a not so updated 'ruby based' blog migrated from a WordPress one:

 [javaee.ch](http://javaee.ch)

## Why 'good practices'? can I contribute with something better?

'Good practices' because I continue to learn and discover better ones.

Probably you know a 'better practice'.If you see a better solution or errors you can send a Pull Request, the project is available on GitHub.

The documentation (as this page) is written in MarkDown and easily editable.

## A lot is still missing to build a complete solution ...

Well,

> This is a free time project. There is a lot to do!
> Your help is very welcome :D
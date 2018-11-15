import { Article } from './Article';

export class ArticleList {

  public static getArticles: Article [] = [
    /*
     {
       title: 'From DB to Autocomplete',
       description: 'Easily add a DB result to an autocomplete in your app',
       link: '/angular/av-components-demo',
       published: new Date(2018,4,15),
       icon: 'assets/images/angular.svg'
     },
     */
    {
      title: 'File Config for Java EE with MicroProfile',
      description: 'How to load the configuration directly from a .properties file',
      link: '/git/javaee/javaee-microprofile-config-api',
      published: new Date(2018, 10, 14),
      icon: 'assets/images/duke.svg'
    },
    {
      title: 'Deploy Angular with Docker and Nginx',
      description: 'Small container and great performances',
      link: '/git/angular/2018-05-10-docker-angular-nginx',
      published: new Date(2018, 4, 10),
      icon: 'assets/images/moby.png'
    },
    {
      title: 'How to deploy Spring Boot with Docker',
      description: 'Basic deployment of a Spring Boot app in a container',
      link: '/doc/spring/deploy-spring-boot-with-docker',
      published: new Date(2018, 4, 1),
      icon: 'assets/images/duke.svg'
    },
    /*
    {
      title: 'Import a JavaScript library in Angular',
      description: '',
      link: '/doc/angular/import-javascript-in-angular',
      published: new Date(2018,4,1),
      icon: 'assets/images/angular.svg'
    },*/
  ]
}

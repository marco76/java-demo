import { Injectable} from '@angular/core';

@Injectable()
export class LeftMenuService {

  menuContent = [{
   label: 'Architecture',
   items: [ {label: 'Main',
     icon: 'fa fa-home',
     description: 'Homepage',
     name: 'home'
   },
     {
       label: 'Checklist',
       description: 'what it is really needed?',
       icon: 'fa fa-file-text-o', name: 'app-checklist'
     },
     {
       label: 'Your own blog with Java and MarkDown',
       description: 'How this documents are rendered',
       icon: 'fa fa-file-text-o', name: 'blog'}
   ]}, {
   label: 'Configuration',
   items: [
     {label: 'Compression',
       description: 'Better performance with smaller files',

       icon: 'fa fa-cog', name: 'config-compression'},

     {label: 'Reload 404 error',
       description: 'PathLocationStrategy',

       name: 'error-controller'},
     {label: 'CORS ',
       description: 'Cross-Origin Resource Sharing',
       name: 'cors-config'},
     {label: 'JCache ',
       description: 'Better performances using Hazelcast',
       name: 'cache-jcache'}
   ]},
   {
     label: 'Angular Dev',
     items: [
       { label: 'Typography',
         description: 'improve the readability of your app', icon: 'fa fa-font-awesome', name: 'font-google'},

       {label: 'Font Awesome', icon: 'fa fa-font-awesome', name: 'font-awesome'},

       {label: 'Styling', icon: 'fa fa-paint-brush', name: '../page/material-create-style'},

       {label: 'Webpack', description: 'fix the navigation issue ', icon: 'fa fa-css3',
         name: 'angular-cli-webpack'},

       {label: 'Route to the top of the page', description: 'where is webpack in Angular CLI?', icon: 'fa fa-font-awesome',
         name: 'angular-to-the-top'},
     ]
   },
   {
     label: 'Build',
     items: [
       {label: 'Jenkins: installation',
         icon: 'fa fa-cog', name: 'jenkins-install'},
       {label: 'Jenkins: GitHub -> Cloud',
         icon: 'fa fa-cog', name: 'jenkins-pipeline'},
       {label: 'Jenkins -> Docker',
         description: 'create a docker image with your jar/war',
         icon: 'fa fa-cog', name: 'jenkins-pipeline-docker'}
     ]},
   {
     label: 'Quality',
     items: [
       {label: 'Coverage, is it enough?',
         description: 'Configuration of JaCoCo and SonarQube',
         icon: 'fa fa-cog', name: 'quality-jacoco'},
       {label: 'Quotes for reviewers',
         description: 'how to reject a PR with style',
         icon: 'fa fa-eye', name: 'quality-code-review-quotes'},

     ]},
   {
     label: 'Monitoring',
     items: [
     ]
   },
   {
     label: 'Documentation',
     items: [

     ]},
    {
      label: 'JSR',
      items: [
        {label: 'CDI Observables',
          description: 'Observable Event example with CDI 2.0',
          icon: '', name: 'cdi-observables'}
      ]
    },

   {
     label: 'Cheat Sheets',
     items: [
       {label: 'Docker',
         icon: '', name: 'docker-cheatsheet'}
     ]
   }
 ];

   constructor() {}

   getMenuContent () {
     return this.menuContent;
   }
}

import { TypeDoc } from "./TypeDoc";

export class AngularMenu {

  static get menu(): { name: string, links: Array<any> } {
    return {
      name: 'angular',

      links: [
        {
          label: 'Components',
          items: [
            {
              label: 'Data Table',
              icon: 'ffa fa fa-book',
              description: 'Create a dynamic table from a JSON string',
              routerLink: '/angular/datatable',
              type: TypeDoc.COMPONENT,
            },
            {
              label: 'Visual Studio Code',
              icon: 'ffa fa fa-book',
              description: 'Setup VSC',
              routerLink: '../visual-studio-code-setup'
            },
          ]
        },
        {
          label: 'RxJS',
          items: [{
            label: 'RxJS - FlatMap',
            icon: 'ffa fa fa-book',
            description: 'Create a dynamic table from a JSON string',
            routerLink: '/flatmap'
          },

            {
              label: 'Visual Studio Code',
              icon: 'ffa fa fa-book',
              description: 'Setup VSC',
              routerLink: '../visual-studio-code-setup'
            },
          ]
        },
        {
          label: 'Deployment',
          items: [{
            label: 'Deploy Angular with Docker and Nginx',
            description: 'Deploy with permformance optimization',
            type: TypeDoc.GIT,
            routerLink: '../docker-angular-nginx'
          }
          ]
        },
        {
          label: '... with Java',
          items: [{
            label: 'Deploy Angular with Java',
            description: 'Deploy everything in a single WAR/JAR',
            routerLink: '../deploy-java-angular-one'
          }]
        }
        ,
        {
          label: 'SEO',
          items: [{
            label: 'Increase your visibility',
            icon: 'ffa fa fa-book',
            description: 'Search Engine Optimization: show your pages to the world',
            routerLink: '../basic-seo-for-angular'
          }]
        },
        {
          label: 'Angular Dev',
          items: [
            {
              label: 'Route to the top of the page',
              description: 'fix the ng navigation issue ', icon: 'fa fa-bug', routerLink: '../angular-to-the-top'
            },
            {
              label: 'Angular Material',
              description: 'introduction to MD', icon: 'fa fa-font-awesome', routerLink: '../md-material'
            },
            {
              label: 'Typography',
              description: 'improve the readability of your app',
              icon: 'fa fa-font-awesome',
              routerLink: '../font-google'
            },
            {label: 'Font Awesome', icon: 'fa fa-font-awesome', routerLink: '../font-awesome'},
            {label: 'Styling', icon: 'fa fa-paint-brush', routerLink: '../page/material-create-style'},

            {
              label: 'Webpack', description: 'where is webpack in Angular CLI?', icon: 'fa fa-css3',
              routerLink: '/angular-cli-webpack'
            },
            {
              label: 'Import JavaScript',
              description: 'import JavaScript libraries',
              icon: 'fa fa-cog',
              routerLink: '../import-javascript-in-angular'
            },
            {
              label: 'Mixing AngularJS and Angular',
              description: 'How to migrate your application',
              icon: 'fa fa-cog',
              routerLink: '../migration-from-angularjs-to-angular'
            }

          ]
        }
      ]
    }
  }
}

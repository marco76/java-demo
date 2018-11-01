export class SpringMenu {

  static get menu(): { name: string, links: Array<any> } {
    return {
      name: 'spring',
      links: [
        {
          label: 'Architecture',
          items: [{
            label: 'Main',
            icon: 'fa fa-home',
            description: 'Homepage',
            routerLink: '../home'
          },
            {
              label: 'Checklist',
              description: 'what it is really needed?',
              icon: 'fa fa-file-text-o', routerLink: '../app-checklist'
            },

            {
              label: 'How this site works',
              description: 'Static content with MarkDown',
              icon: 'fa fa-file-text-o', routerLink: '../how-the-pages-are-rendered'
            }
          ]
        }, {
          label: 'Spring Configuration',
          items: [
            {
              label: 'Compression',
              description: 'Better performance with smaller files',

              icon: 'fa fa-cog', routerLink: '../config-compression'
            },

            {
              label: 'Whitelabel (404) error',
              description: 'PathLocationStrategy',
              routerLink: '../error-controller'
            },
            {
              label: 'CORS ',
              description: 'Cross-Origin Resource Sharing',
              routerLink: '../cors-config'
            },
            {
              label: 'Deploy with Docker',
              description: 'Deploy a jar Spring Boot using Docker',
              routerLink: '../deploy-spring-boot-with-docker'
            }
          ]
        },
        {
          label: 'Spring Dev',
          items: [
            {
              label: 'Caching ',
              description: 'Increase the performances with caching',
              routerLink: '../spring-cache'
            }

          ]
        },

        {
          label: 'Build',
          items: [
            {
              label: 'Jenkins: installation',
              icon: 'fa fa-cog', routerLink: '../jenkins-install'
            },
            {
              label: 'Jenkins: GitHub -> Cloud',
              icon: 'fa fa-cog', routerLink: '../jenkins-pipeline'
            },
            {
              label: 'Jenkins -> Docker',
              description: 'create a docker image with your jar/war',
              icon: 'fa fa-cog', routerLink: '../jenkins-pipeline-docker'
            }
          ]
        },
        {
          label: 'Quality',
          items: [
            {
              label: 'Coverage, is it enough?',
              description: 'Configuration of JaCoCo and SonarQube',
              icon: 'fa fa-cog', routerLink: '../quality-jacoco'
            },
            {
              label: 'Quotes for reviewers',
              description: 'how to reject a PR with style',
              icon: 'fa fa-eye', routerLink: '../quality-code-review-quotes'
            },

          ]
        },
        {
          label: 'Monitoring',
          items: [
            {
              label: 'Actuator: is your app still up?',
              icon: '', routerLink: '../actuator-monitoring'
            }
          ]
        },
        {
          label: 'Documentation',
          items: [
            {
              label: 'Swagger',
              description: 'REST documentation',
              icon: 'ffa fa fa-book', routerLink: '../swagger-config'
            }
          ]
        },

        {
          label: 'Cheat Sheet',
          items: [
            {
              label: 'Docker',
              icon: '', routerLink: '../docker-cheatsheet'
            }
          ]
        }
      ]
    };
  }
}

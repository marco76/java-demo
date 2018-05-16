import {TypeDoc} from "./TypeDoc";

export class JavaEEMenu {

  static get menu(): {name: string, links: Array<any>} {
    return {
      name: 'javaee',
      links: [{
        label: 'Release 8',
        items: [ {label: 'What is new?',
          icon: 'fa fa-home',
          description: '',
          type: TypeDoc.COMPONENT,
          routerLink: '/jsr-status'}]
      }, {
        label: 'Bean Validation',
        items: [
          {label: 'Simple validation',
            description: 'Validation fundamentals',
            type: TypeDoc.COMPONENT,
            icon: 'fa fa-cog', routerLink: '/bv'},

          {label: '@Past, @Future',
            type: TypeDoc.COMPONENT,
            description: 'Date validation',

            routerLink: '/bv-date'},
          {label: '@Size, groups',
            type: TypeDoc.COMPONENT,

            description: 'Repeatable and groups',
            routerLink: '/bv-repeatable'},
          {label: 'List<@Email>, @Size',
            type: TypeDoc.COMPONENT,

            description: 'How to validate a list?',
            routerLink: '/bv-list-email'}
          ,
          {label: '@Positive, @Negative',
            type: TypeDoc.COMPONENT,

            description: 'Numbers and the Zero ???',
            routerLink: '/bv-positive-negative-zero'}

        ]},
        {
          label: 'JAX-RS',
          items: [
            {label: 'Dashboard (JAX-RS, BV, JSON-B)',
              description: 'charts with D3.js',
              type: TypeDoc.COMPONENT,

              icon: 'fa fa-cog',
              routerLink: '/dashboard'},

            {label: 'REST',
              description: 'Answer to Web requests',
              type: TypeDoc.COMPONENT,

              routerLink: '/hello'},
            {label: 'Kotlin',
              description: 'REST service built with Kotlin',
              type: TypeDoc.COMPONENT,

              routerLink: '/kotlin-hello'}

          ]},
        {
          label: 'Security',
          items: [
            {
              label: 'Login',
              type: TypeDoc.COMPONENT,

              description: 'New Security JSR',
              routerLink: '/security'
            }

          ]
        },


        {
          label: 'Play with some Examples',
          items: [
            {label: 'WebSocket',
              type: TypeDoc.COMPONENT,

              description: 'Build a dummy ChatBot', icon: 'fa fa-bug', routerLink: '/chatbot'},
            {label: 'JPA',
              type: TypeDoc.COMPONENT,

              description: 'Conferences - From the DB to the Web', icon: 'fa fa-font-awesome', routerLink: '/jpa-conferences'},
            {label: 'Caching',
              type: TypeDoc.COMPONENT,

              description: 'File caching example', icon: 'fa fa-font-awesome', routerLink: '/extra-cache'},
            {label: 'Excel Export (JAX-RS)',
              type: TypeDoc.COMPONENT,
              description:'download files', icon: 'fa fa-font-awesome', routerLink: '/excel-export'},

          ]
        },
      ]
  }
}}

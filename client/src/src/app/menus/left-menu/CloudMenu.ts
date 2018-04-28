export class CloudMenu {

  static get menu(): {name: string, links: Array<any>} {
    return {
      name: 'cloud',
      links:[{
        label: 'Deployment',
        items: [
          {label: 'Website / Angular',
          icon: 'fa fa-paper-plane',
          description: 'Static app in the bucket',
          routerLink: '../deploy-angular-google-cloud'},
        ]
      }
        ]
    };
  }
}

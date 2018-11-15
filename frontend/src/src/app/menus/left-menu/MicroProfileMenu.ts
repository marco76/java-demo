import { TypeDoc } from "./TypeDoc";

export class MicroProfileMenu {

  static get menu(): { name: string, links: Array<any> } {
    return {
      name: 'microprofile',

      links: [
        {
          label: 'Features',
          items: [
            {
              label: 'Config',
              icon: 'ffa fa fa-book',
              description: 'Config files in Java EE',
              routerLink: '../javaee-microprofile-config-api',
              type: TypeDoc.GIT
            },
          ]
        }
      ]
    }
  }
}

import { TypeDoc } from "./TypeDoc";

export class JDK11Menu {

  static get menu(): { name: string, links: Array<any> } {
    return {
      name: 'java11',
      links: [
        {
          label: 'Java version 11',
          items: [
            {
              label: 'New features',
              type: TypeDoc.GIT,
              description: 'Some of the new features of Java 11',
              icon: 'fa fa-file-text-o',
              routerLink: '../what-s-new-java-11'
            },
            {
              label: 'JDK : Pay or not?',
              type: TypeDoc.GIT,
              icon: 'fa fa-file-text-o',
              description: 'Should I pay for Java 11?',
              routerLink: '../java-jdk-11-free'
            },


          ]
        },
        {
          label: 'Java',
          items: [
            {
              label: 'The \'final\' keyword',
              type: TypeDoc.GIT,
              description: 'The objects are not immutable with final',
              icon: 'fa fa-file-text-o',
              routerLink: '../java-the-final-keyword'
            }, {
              label: 'HashMap inline initialization in a Lambda expression',
              type: TypeDoc.GIT,
              description: 'Did you already see the {{ }} notation?',
              icon: 'fa fa-file-text-o',
              routerLink: '../java-hashmap-inline-initialization'
            },
          ]
        },

      ]
    };
  }
}

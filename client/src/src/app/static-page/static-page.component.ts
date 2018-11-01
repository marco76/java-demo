import { Component, OnInit } from '@angular/core';
import { RequestService } from '../common/http/request.service';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css'],
  providers: [RequestService]
})
export class StaticPageComponent implements OnInit {

  markdown = '';
  gitDocument: string;
  githubReference: string;

  routeForPage: { [pagename: string]: string; } = {};


  static setVariables(markdown: string) {
    if (!markdown) {
      return '';
    }
    while (markdown.indexOf('[p]') > 0) {
      const tag = markdown.match('\\[p](.*)\\[\\/p]');
      if (tag) {
        markdown = markdown.replace(`${tag[0]}`, environment.DOCUMENT_VALUES[`${tag[1]}`]);
      } else {
        return markdown;
      }
    }
    return markdown;
  }

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.routeForPage["java-the-final-keyword"] = "2018-10-03-java-the-final-keyword";
    this.routeForPage["java-hashmap-inline-initialization"] = "2018-10-08-java-hashmap-inline-initialization";
    this.routeForPage["java-jdk-11-free"] = "2018-09-01-java-jdk-11-free";
    this.routeForPage["what-s-new-java-11"] = "2018-09-15-what-s-new-java-11";
    this.routeForPage["docker-angular-nginx"] = "2018-05-10-docker-angular-nginx";
  }


  ngOnInit() {
    console.log('document', this.route.snapshot.paramMap.get('document'));

    this.route.paramMap.switchMap((params: ParamMap) => {

      this.gitDocument = params.get('document');
      this.gitDocument = this.findSynonym(this.gitDocument);
      this.githubReference = `${environment.GIT_DOCUMENTS_URL}${this.gitDocument}.md`;

      if (this.route.routeConfig.path.startsWith('git') || this.gitDocument.startsWith('20')) {
        return this.requestService.getGitText('rest/document/git/' + this.gitDocument)
      }

      return this.requestService.getText('rest/document/' + this.gitDocument)
    })
      .subscribe(
        result => {
          this.markdown = StaticPageComponent.setVariables(result)
        },
        error => {
          console.log(error._body)
        }
      );

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  findSynonym(routeName
                :
                string
  ):
    string {
    if (this.routeForPage[routeName]) {
      return this.routeForPage[routeName]
    }
    return routeName;
  }
}



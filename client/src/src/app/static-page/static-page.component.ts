import {Component, OnInit} from '@angular/core';
import {RequestService} from '../common/http/request.service';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {environment} from '../../environments/environment';

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

  static setVariables (markdown: string) {
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

 constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log('document', this.route.snapshot.paramMap.get('document'));

    this.route.paramMap.switchMap((params: ParamMap) => {

      this.gitDocument = params.get('document');
      this.githubReference = `${environment.GIT_DOCUMENTS_URL}${this.gitDocument}.md`;
      console.log('this.route.routeConfig.path');
      if (this.route.routeConfig.path.startsWith('git') || this.gitDocument.startsWith('20')){
        return this.requestService.getGitText('rest/document/git/' + this.gitDocument)
      }

      return this.requestService.getText('rest/document/' + this.gitDocument)
    })
      .subscribe(
      result => {this.markdown = StaticPageComponent.setVariables(result)},
      error => { console.log(error._body) }
    );

    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });
    }
}

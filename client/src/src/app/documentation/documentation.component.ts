// Exact copy except import UserService from core
import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {RequestService} from "../common/http/request.service";

import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: [ './documentation.component.css' ],
  providers: [RequestService]
})
export class DocumentationComponent implements OnInit {

  msg = 'Loading documentation ...';
  public customClass: string = 'customClass';
  public isFirstOpen: boolean = false;
  public group:boolean = true;
  public isOpen:boolean = false;


  @Input() url: string;

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
    this.route.paramMap.switchMap((params: ParamMap) => {

      this.gitDocument = params.get('document');
      if (!this.gitDocument) {
        this.gitDocument="javaee-8-wildfly"
      }
      this.githubReference = `${environment.GIT_DOCUMENTS_URL}${this.gitDocument}.md`;

      return this.requestService.sendGet('/rest/blog/file/' + this.gitDocument)
    })
      .subscribe(
        result => {console.log(result);this.markdown = DocumentationComponent.setVariables(result.toString())},
        error => { console.log(error._body) }
      );

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}

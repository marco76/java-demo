import {Component, Input, OnInit} from '@angular/core';


import {ActivatedRoute, NavigationEnd, ParamMap, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {DocumentationService} from "./documentation.service";
import {environment} from "../../environments/environment.prod";

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: [ './documentation.component.css' ],
  providers: [DocumentationService]
})
export class DocumentationComponent implements OnInit {

  public group: boolean = true;

  @Input() url: string;

  markdown = '';
  gitDocument: string;
  githubReference : string = '';

  constructor(private route: ActivatedRoute, private router: Router,
              private documentationService: DocumentationService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.getDocumentFromServer(params['document']);
    });
  }
      getDocumentFromServer(documentName : string) {
        this.githubReference = `${environment.GIT_DOCUMENTS_URL}${this.gitDocument}.md`;


        if (!documentName) {
          documentName = "home"
        }

       this.documentationService.getDocumentFromServer(documentName).subscribe(result => {
         this.markdown = result
       }
       );

    return this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return window.scrollTo(0, 0);
      }
    });
  }
}

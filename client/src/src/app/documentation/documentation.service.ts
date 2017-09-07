import {Injectable} from "@angular/core";
import {RequestService} from "../common/http/request.service";
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DocumentationService {

  constructor(private requestService : RequestService) {}

  getDocumentFromServer(documentName : string) : Observable<string> {
    return this.requestService.sendGet('/rest/blog/file/' + documentName)
      .map(result => DocumentationService.setVariables(result.text.content),
        error => ''
      );
  }

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
}

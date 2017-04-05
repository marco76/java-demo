import {Component, OnInit, Input} from '@angular/core';
import { PrettyJsonPipe } from "../pretty-json/prettyJson.pipe";

import { HighlightJsService } from '../../../../node_modules/angular2-highlight-js/lib/highlight-js.module';

@Component({
  selector: 'app-technical-info',
  templateUrl: './technical-info.component.html',
  styleUrls: ['./technical-info.component.css'],
  providers: [PrettyJsonPipe]
})
export class TechnicalInfo implements OnInit {

   _code : string;
   _response : any;
   _request: any;
   _rawResponse: any;

  public alerts: any = [];


  isValid : boolean = undefined;

  constructor(private hService: HighlightJsService, private prettyJson : PrettyJsonPipe) {
  }

  ngOnInit() {
  }

  @Input()
   set response(response : any) {
       this._rawResponse = response;
       this._response = this.formatToJson(response);
       this.doOnResponse();
   }

   @Input()
   set request(request : any) {
    this._request = this.formatToJson(request);
  }

  @Input()
  set code(code : string) {
    this._code = code;
  }

  get response(): any { return this._response; }

  get request(): any { return this._request; }

  formatToJson(json : any) : string {
    return  `<pre><code class="json highlight">` +
            this.prettyJson.transform(json)+ `</code></pre>`;
  }

  get code(): string { return this._code}


   doOnResponse(): void {
     if (typeof this._rawResponse == 'undefined' || this._rawResponse === "") {
       return;
     } else {
       if (this._rawResponse.length == 0) {
         this.isValid = true;
       } else {
         this.isValid = false;
       }

       this.showAlert();
     }
  }
  showAlert() {
    if (this.isValid) {
      this.alerts.push({
        type: 'success',
        msg: `The request is valid (added: ${(new Date()).toLocaleTimeString()})`,
        timeout: 20000
      });
    } else {
      this.alerts.push({
        type: 'danger',
        msg: `The request is NOT Valid (added: ${(new Date()).toLocaleTimeString()})`,
        timeout: 20000
      });
    }
  }

}

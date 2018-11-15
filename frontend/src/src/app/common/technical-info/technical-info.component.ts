import { Component, OnInit, Input} from '@angular/core';
import { PrettyJsonPipe } from "../pretty-json/prettyJson.pipe";
import { HighlightJsService } from 'angular2-highlight-js';
import ResponseInfo from "./ResponseInfo";
import { isNullOrUndefined } from "util";
import { SimplePrettyXML } from "../pretty-json/simplePrettyXML";

@Component({
  selector: 'app-technical-info',
  templateUrl: './technical-info.component.html',
  styleUrls: ['./technical-info.component.css'],
  providers: [PrettyJsonPipe, SimplePrettyXML]
})
export class TechnicalInfo implements OnInit {

   _code : string;
   _response : any;
   _request: any;
   _responseInfo : ResponseInfo;
   _format : string = 'json';

  public alerts: any = [];

  isValid : boolean = undefined;

  constructor(private hService: HighlightJsService, private prettyJson : PrettyJsonPipe,
               private prettyXml : SimplePrettyXML) {
  }

  ngOnInit() {
  }

  @Input()
   set response(response : any) {
       this._response = this.formatToJson(response);
       this.doOnResponse();
   }

  @Input()
  set responseInfo(responseInfo : ResponseInfo) {
    if (!responseInfo) {
      return;
    }
    this._responseInfo = responseInfo;
    if (this._responseInfo.format == "json") {
      this._response = this.formatToJson(responseInfo.text);
    } else {
      this._response = this.formatToXML(responseInfo.text);
    }
    this._format = this._responseInfo.format;
    this.isValid = !responseInfo.error;
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

  formatToXML(xml : any) : string {
    return `<pre><code class="xml highlight">` +this.prettyXml.transform(xml) + `</code></pre>`;
  }

  get code(): string { return this._code}


  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  doOnResponse(): void {
       this.showAlert();
  }

  showAlert() {
    if (isNullOrUndefined(this._responseInfo)) {
      return;
    }
    if (this.isValid) {
      this.alerts.push({
        type: 'success',
        msg: `The request is valid (${(new Date()).toLocaleTimeString()})`,
        timeout: 20000
      });
    } else {
      this.alerts.push({
        type: 'danger',
        msg: `The request is NOT Valid (${(new Date()).toLocaleTimeString()})`,
        timeout: 20000
      });
    }
  }
}

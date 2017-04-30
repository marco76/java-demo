import { Injectable, OnInit} from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import ResponseInfo from "../technical-info/ResponseInfo";
import 'rxjs/add/observable/of'


@Injectable()
export class RequestService implements OnInit{

  serverUrl : string = environment.BACKEND_URL;
  responseOK : {"responseStatus" : "OK"};

  private headers : Headers;

  constructor(private http: Http) { }

  sendRequest(url:string, model : any) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });

    return this.http
      .post(this.serverUrl + url, model, options)
      .map((response: Response) => {
        let responseInfo = new ResponseInfo();
        responseInfo.status = response.status;
        if (response.text()) {
            responseInfo.text = response.json();
        } else {
          responseInfo.text = "";
        }
        responseInfo.error = false;
        return responseInfo;
      }).catch((error) =>
         Observable.of(this.buildErrorAnswer(error))
      );
  }

  sendRequestForXML(url:string, model : any) : Observable<any> {

    let hXML = new Headers({ 'Content-Type': 'application/json' });
    hXML.append('Accept', 'application/xml');
    hXML.append('X-Requested-With', 'XMLHttpRequest');

    let options = new RequestOptions({ headers: hXML });

    return this.http
      .post(this.serverUrl + url, model, options)
      .map((response: Response) => {
        let responseInfo = new ResponseInfo();
        responseInfo.status = response.status;
        responseInfo.format = "xml";
        if (response.text()) {
          responseInfo.text = response.text();
        } else {
          responseInfo.text = "";
        }
        responseInfo.error = false;
        return responseInfo;
      }).catch((error) =>
        Observable.of(this.buildErrorAnswerXML(error))
      );
  }
  sendGet(url:string) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });

    return this.http
      .get(this.serverUrl + url, options)
      .map((response: Response) => {
        let responseInfo = new ResponseInfo();
        responseInfo.status = response.status;
        if (response.text()) {
          responseInfo.text = response.json();
        } else {
          responseInfo.text = "";
        }
        responseInfo.error = false;
        return responseInfo;
      }).catch((error) =>
        Observable.of(this.buildErrorAnswer(error))
      );
  }


  sendGetType(url:string, type : ResponseContentType) : Observable<any> {
    console.log("sendGetType");
    let hOctet = new Headers({ 'Content-Type': 'application/json' });
    hOctet.append('Accept', 'application/octet-stream');
    hOctet.append('X-Requested-With', 'XMLHttpRequest');

    let options = new RequestOptions({ headers: hOctet, responseType : type});

    return this.http
      .get(this.serverUrl + url, options)
      .map((response: Response) => {
        console.log(response);
        return response;
      }).catch((error) =>
        Observable.of(this.buildErrorAnswer(error))
      );
  }

  buildErrorAnswer(error) : ResponseInfo{

    let responseInfo = new ResponseInfo();
    responseInfo.status = error.status;
    responseInfo.text = error.json();
    responseInfo.error = true;
    return responseInfo

  }

  buildErrorAnswerXML(error) : ResponseInfo{

    let responseInfo = new ResponseInfo();
    responseInfo.status = error.status;
    responseInfo.text = error.text();
    responseInfo.error = true;
    responseInfo.format = "xml";
    return responseInfo

  }

  ngOnInit() {

    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Accept', 'application/json, text/xml');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

  }
}

import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import ResponseInfo from "../technical-info/ResponseInfo";
import 'rxjs/add/observable/of'
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class RequestService {

  serverUrl : string = environment.BACKEND_URL;
  documentsServerUrl: string = environment.DOCUMENTS_URL;
  private headers : Headers;

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    // OnInit not supported by services
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Accept', 'application/json, text/xml');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');
  }

  sendRequest(url:string, model : any) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });
    this.addAuthHeader(this.headers);

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
    this.addAuthHeader(this.headers);

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
  sendGet(url:string, server?: string) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });
    this.addAuthHeader(this.headers);
    let urlEndpoint = server ? server + url : this.serverUrl + url;

    return this.http
      .get(urlEndpoint, options)
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

  sendGetForm(url:string, model: any) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });
    this.addAuthHeader(this.headers);

    return this.http
      .get(this.serverUrl + url +'?' + model.toString(), options)
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
    let hOctet = new Headers({ 'Content-Type': 'application/json' });
    hOctet.append('Accept', 'application/octet-stream');
    hOctet.append('X-Requested-With', 'XMLHttpRequest');

    let options = new RequestOptions({ headers: hOctet, responseType : type});
    this.addAuthHeader(this.headers);

    return this.http
      .get(this.serverUrl + url, options)
      .map((response: Response) => {
        return response;
      }).catch((error) =>
        Observable.of(this.buildErrorAnswer(error))
      );
  }

  simpleGet(url: string) : Observable<Response> {
    console.log("simple get");

    let options = new RequestOptions({ headers: this.headers });
    this.addAuthHeader(this.headers);

    return this.http
      .get(this.serverUrl + url, options)
      .map((response: Response) => {
        return response;
      }).catch((error) =>
        Observable.of(error)
      );
  }

  simpleGetJson(url: string) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });
    this.addAuthHeader(this.headers);

    return this.http
      .get(this.serverUrl + url, options)
      .map((response: Response) => {
        return response.json();
      }, (error) => {
        error.json();
      })
  }

  getText(url: string): Observable<any> {

    const options = new RequestOptions({ headers: this.headers });

    return this.http
      .get(this.documentsServerUrl + '/' + url, options)
      .map((response: Response) => {
        return response.text();
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

  addAuthHeader(headers: Headers) {
    if (this.authenticationService.authorization) {
      if (!this.headers.has('Authorization')) {
        headers.set('Authorization', 'Basic ' +
          this.authenticationService.authorization);
      }
    }
  }
}

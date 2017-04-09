import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {HttpClient} from '../common/http/HttpClient';
import {JSRStatus} from './JSRStatus';

@Injectable()
export class JsrStatusService {

  serverUrl : string = environment.BACKEND_URL;

  constructor(private http: Http, private httpClient : HttpClient) { }

  loadStatus() : Observable<JSRStatus[]> {

    let options = new RequestOptions({ headers: this.httpClient.getHeaders() });

    return this.http
      .get(this.serverUrl + "/rest/read-file", options)
      .map((response: Response) => {
        return response.json();
      }, (error) => {
        error.json();
      })
}

}

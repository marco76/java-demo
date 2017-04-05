import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';


@Injectable()
export class BvService {

  serverUrl : string = environment.BACKEND_URL;

  private headers : Headers;

  constructor(private http: Http) { }

  saveParticipant(model : any) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });

    return this.http
      .post(this.serverUrl + "/rest/bv/participant", model, options)
      .map((response: Response) => {
       return response.json();
      }, (error) => {
      error.json();
    })
  }

  savePatient(model : any) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });

    return this.http
      .post(this.serverUrl + "/rest/bv/time/patient", model, options)
      .map((response: Response) => {
        return response.json();
      }, (error) => {
        error.json();
      })
  }

  repeatableDemo1(model : any) :Observable<any> {

    let options = new RequestOptions({ headers: this.headers });
    return this.http
      .post(this.serverUrl + "/rest/bv/repeatable/user", model, options)
      .map((response: Response) => {
        return response.json();
      }, (error) => {
        return error._body.json();
      })
  }

  saveListEmail(model : any) : Observable<any> {

    let options = new RequestOptions({ headers: this.headers });

    return this.http
      .post(this.serverUrl + "/rest/bv/email/list", model, options)
      .map((response: Response) => {
        return response.json();
      }, (error) => {
        error.json();
      })
  }

  ngOnInit() {

    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Accept', 'application/json, text/csv');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

  }

}

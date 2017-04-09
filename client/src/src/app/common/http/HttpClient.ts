import {Injectable, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient implements OnInit{

  _headers : Headers;

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('username:password'));
  }

  ngOnInit(){
    this._headers = new Headers({ 'Content-Type': 'application/json' });
    this._headers.append('Accept', 'application/json, text/csv');
    this._headers.append('X-Requested-With', 'XMLHttpRequest');
  }

  getHeaders() {
    return this._headers;
  }


  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}

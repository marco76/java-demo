import { Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import 'rxjs/add/observable/of';
import Credentials from './Credentials';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  serverUrl : string = environment.BACKEND_URL;
  private headers : Headers;

  constructor(private http: Http, private router: Router) {

  }

  sendAuthRequest(url:string, credentials : Credentials) : Observable<any> {
    let authorization = btoa(credentials.username + ":" + credentials.password);

    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Accept', 'application/json, text/xml');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');
    this.headers.append("Authorization", "Basic " + authorization);

    return this.http
      .get(this.serverUrl + url, {headers:this.headers, withCredentials : true})
      .map((response: Response) => {

        let result = JSON.parse(response.text());
        sessionStorage.setItem('username', result.username);
        sessionStorage.setItem('authorization', authorization);
        return response;

      }).catch((error) =>
         Observable.of(error)
      );
  }

  logout() {
     sessionStorage.removeItem('username');
     sessionStorage.removeItem('authorization');
     this.router.navigate(['/']);
  }

  get authenticated() {
    return this.username;
  }

  isAuthenticated() : boolean {
    if (sessionStorage.getItem("username")) {
       return true;
    }
    return false;
  }

  get username() {
    return sessionStorage.getItem("username");
  }

  get authorization() {
    return sessionStorage.getItem('authorization');
  }
}

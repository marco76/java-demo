import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';


@Injectable()
export class HelloService {

    serverUrl : string = environment.BACKEND_URL + "/rest/helloworld";


  constructor(private http: Http) { }

  getHelloWorldFromService() : string {
      return "hello world from the service";
  }

  getHelloWorldFromJava() : Observable<any> {

      console.log ("getHelloFromJava");

      return this.http
          .get(this.serverUrl)
          .map((response: Response) => {

              console.log("REST response json: " + (response));

              return response.json().result;
          })
  }

}

import { Component, OnInit } from '@angular/core';
import {HelloService} from "./hello.service";

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  providers: [HelloService]
})
export class HelloComponent implements OnInit {

  helloFromService : string;
  helloFromJava : any;

  constructor(private helloService : HelloService) { }

  ngOnInit() {
    this.getHelloFromService();
    this.getHelloFromJava();
  }

  getHelloFromService() : void {
    this.helloFromService =  this.helloService.getHelloWorldFromService()
  }

  getHelloFromJava() : void {
    this.helloFromJava = this.helloService.getHelloWorldFromJava()
        .subscribe((data : any) => {
      // we receive a json object, we have to extract the string
      this.helloFromJava = data;
    });
  }


}

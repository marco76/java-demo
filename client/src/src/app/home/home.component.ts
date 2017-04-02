import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {

  helloFromService : string;
  helloFromJava : any;

  constructor() { }

  ngOnInit() {
  }

}

import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private elementRef:ElementRef) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // DOM manipulation should be exceptional
    // but we avoid to have this script in every component
    let scriptElement : HTMLScriptElement;
    scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.src = "http://platform.twitter.com/widgets.js";
    this.elementRef.nativeElement.appendChild(scriptElement);
  }
}

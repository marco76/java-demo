// Exact copy except import UserService from core
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: [ './documentation.component.css' ]
})
export class DocumentationComponent implements OnInit {

  msg = 'Loading documentation ...';
  public customClass: string = 'customClass';
  public isFirstOpen: boolean = false;
  public group:boolean = true;
  public isOpen:boolean = false;
  @Input() url: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
  }

  /** Display a message briefly, then remove it. */
  displayMessage(msg: string) {
    this.msg = msg;
    setTimeout(() => this.msg = '', 1500);
  }
}

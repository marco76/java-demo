import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AvTableColumnForm} from "./AvTableColumnForm";

@Component({
  selector: 'app-av-form-element',
  templateUrl: './av-form-element.component.html',
  styleUrls: ['./av-form-element.component.css']
})
export class AvFormElementComponent implements OnInit {

  @Input() element: AvTableColumnForm;
  @Input() form: FormGroup;

  constructor() { }


  payLoad = '';

  ngOnInit() {

    console.log('form', this.form);
  }

}

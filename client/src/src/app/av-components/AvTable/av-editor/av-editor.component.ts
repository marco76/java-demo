import {Component, Inject, OnInit} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AvTableColumnConfig} from "../av-table/AvTableColumnConfig";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AvEditorService} from "./av-editor.service";


@Component({
  selector: 'app-av-editor',
  templateUrl: './av-editor.component.html',
  styleUrls: ['./av-editor.component.css'],
  providers: [AvEditorService]
})
export class AvEditorComponent implements OnInit {

  dataColumns : Array<AvTableColumnConfig>;
  debug : string = null;
  editedObject : any;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AvEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private avEditorService : AvEditorService) { }

  ngOnInit() {
    this.editedObject = {};
    this.dataColumns = this.data.dataColumns;
    if (this.data.edited) {
      this.editedObject = this.data.edited;
    }

    this.form = this.avEditorService.toFormGroup(this.dataColumns);
  }

  onSave(){

  }

  onExit(){
    this.dialogRef.close(null);
  }


}

import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AvTableColumnConfig } from "../av-table/AvTableColumnConfig";
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-av-column-properties',
  templateUrl: './av-column-properties.component.html',
  styleUrls: ['./av-column-properties.component.css']
})
export class AvColumnPropertiesComponent implements OnInit {

  columnsDefinition: Array<AvTableColumnConfig>;
  selectedColumn: AvTableColumnConfig = null;
  selectedProperty: string;
  propertyDefinition: Array<string> = ['label', 'editable', 'required', 'hide'];
  displayedColumns = ['fieldName', 'label'];
  dataSource: MatTableDataSource<AvTableColumnConfig>;
  @Output() updatedColumnsDefinition = new EventEmitter<Array<AvTableColumnConfig>>();

  constructor(public dialogRef: MatDialogRef<AvColumnPropertiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.columnsDefinition = this.data.columnsDefinition;
    this.dataSource = new MatTableDataSource(this.columnsDefinition);
    console.log(this.columnsDefinition);
  }

  getColumnsDefinition() {
    return this.columnsDefinition;
  }

  onSave() {
    this.updatedColumnsDefinition.emit(this.columnsDefinition);
    this.dialogRef.close(this.columnsDefinition);
  }

  onExit() {
    this.dialogRef.close(null);
  }

  onSelectionChange($event: MatSelect) {
    this.displayedColumns = ['fieldName', $event.value];
  }
}

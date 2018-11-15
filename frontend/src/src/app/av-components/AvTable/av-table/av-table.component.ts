import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatCheckboxChange, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {AvTableConfig} from "./AvTableConfig";
import {AvTableColumnConfig} from "./AvTableColumnConfig";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AvEditorComponent} from "../av-editor/av-editor.component";
import {AVTableTransaction} from "./AVTableTransaction";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {AvColumnPropertiesComponent} from "../av-column-properties/av-column-properties.component";

@Component({
  selector: 'app-av-table',
  templateUrl: './av-table.component.html',
  styleUrls: ['./av-table.component.css'],
  animations: [
    trigger( 'itemStatus',
      [state('deleted', style(
        {display: 'none'}
)),
    transition('* => deleted',
      animate('1.5s 10ms',
        keyframes([
          style({opacity: '1', background: '#ff5050'}),
          style({opacity: '0.5'}),
          style({opacity: '0.4'}),
          style({opacity: '0.3'}),
          style({opacity: '0.1'}),

        ])))
  ])]
})
export class AvTableComponent implements OnChanges, OnInit {

  @Input() dataSource? : MatTableDataSource<any>;
  @Input() configuration?: AvTableConfig;
  @Input() dataArray?: Array<any>;
  @Input() transactionStatus?: string;
  @Output() transaction: EventEmitter<AVTableTransaction> = new EventEmitter<AVTableTransaction>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  standardColumns : Array<AvTableColumnConfig> = [{fieldName: 'select', label: 'select'}];
  columnsToShow : Array<string> = [];
  selectedRows : Array<any> = [];
  isSelectionEditable = false;
  isSelectionDeletable = false;
  numberOfSelectedItems = 0;

  dataColumns : Array<AvTableColumnConfig>;

  constructor(public dialog: MatDialog) {
  }

  onCheckAll($event){
    this.selectedRows = [];

    if ($event.checked) {
      this.setAllRecords(true);
    } else {
      this.setAllRecords(false);
    }

    this.setStatusActions();
  }

  onCheckElement($event : MatCheckboxChange, row : any) {
    if ($event.checked) {
      //this.selectedRows.push($event.source.)
      this.selectedRows.push(row);
    } else {
      let index = this.selectedRows.indexOf(row);
      this.selectedRows.splice(index, 1);
    }

    this.setStatusActions();
  }

  setStatusActions() : void {

    this.numberOfSelectedItems = this.selectedRows.length;

    if (!this.configuration) {

      this.isSelectionDeletable = this.numberOfSelectedItems > 0;
      this.isSelectionEditable = this.numberOfSelectedItems === 1;

    } else {

      if (this.configuration.tableActions.deletableRecord) {
        this.isSelectionDeletable = this.numberOfSelectedItems > 0;
      }

      if (this.configuration.tableActions.editableRecord) {
        this.isSelectionEditable = this.numberOfSelectedItems === 1;
      }
    }
  }

  getSelected(){
    let selected = 0;
    if (this.dataSource.data){
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].isSelected) {
          selected++;
        }
      }
    }
    return selected;
  }

  setAllRecords(status : boolean) : void{
    this.numberOfSelectedItems = 0;
    this.selectedRows = [];

    if (this.dataSource.data){
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].isSelected = status;
        if (status) {
          this.selectedRows.push(this.dataSource.data[i]);
        }
      }
      this.numberOfSelectedItems = this.dataSource.data.length;
    }
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.dataSource);
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transactionStatus){
      if (changes.transactionStatus.currentValue === "committed") {
        for (let item of this.selectedRows) {
          item.status = 'deleted';
          let position = this.dataSource.data.indexOf(item);

          this.dataSource.data.splice(position, 1);
          this.transactionStatus = null;
        }
        this.selectedRows = [];
        this.setStatusActions();
      }
    }
    /*
    this.dataSource = changes.dataSource.currentValue;

    if (changes.configuration){
      this.updateTableConfiguration(changes.configuration.currentValue as AvTableConfig);
    }

    if (changes.dataSource && !this.columnsToShow) {
      if (this.dataSource) {
        this.displayedColumns = this.searchColumnDefinition(this.dataSource.data[0]);
        this.columnsToShow = this.setColumnsToShow(this.standardColumns, this.displayedColumns);
      }
    }
    */
    this.ngOnInit();
  }

/*
  private setColumnsToShow(standardColBegin: Array<AvTableColumnConfig>, appColumns : Array<AvTableColumnConfig>) : Array<AvTableColumnConfig> {
    let columns : Array<AvTableColumnConfig> = [];

    for (let column of standardColBegin){
      columns.push(column);
    }
    for (let column of appColumns){
      columns.push(column);
    }
    return columns
  }*/

  private setColumnsToShow(standardColBegin: Array<AvTableColumnConfig>, appColumns : Array<AvTableColumnConfig>) : Array<string> {
    let columns : Array<string> = [];

    for (let column of standardColBegin){
      columns.push(column.fieldName);
    }
    for (let column of appColumns){
      if (!column.hide) {
        columns.push(column.fieldName);
      }
    }
    return columns
  }

  searchColumnDefinition(dataObject : any) : Array<AvTableColumnConfig>{
    let keys : Array<AvTableColumnConfig> = [];

    for (let name of Object.keys(dataObject)) {
      keys.push({fieldName: name, label: name});
    }
    return keys;
  }

  ngOnInit(): void {
    if (this.dataArray) {
      this.dataSource = new MatTableDataSource<any>(this.dataArray);
    }

    this.dataColumns = [];

    //cool they gave us some config to build the columns
    if (this.configuration && this.configuration.columnDefinition) {
        for (let item of this.configuration.columnDefinition) {
            this.dataColumns.push(item);
        }
        this.columnsToShow = this.setColumnsToShow(this.standardColumns, this.dataColumns);
    } else {

      if (this.dataSource.data.length > 0) {
         this.dataColumns = this.searchColumnDefinition(this.dataSource.data[0]);
         if (this.columnsToShow.length === 0) {
           this.columnsToShow = this.setColumnsToShow(this.standardColumns, this.dataColumns);
         }
      }
    }
  }

  onCreateRecord() : void {
    let dialogRef = this.dialog.open(AvEditorComponent,{
      height: '400px',
      width: '600px',
      data:{dataColumns: this.dataColumns}
    });
  }

  onEditRecord() : void {
    let dialogRef = this.dialog.open(AvEditorComponent, {
      height: '400px',
      width: '600px',
      data:{dataColumns: this.dataColumns, edited: this.selectedRows[0]}
    })
  }


  onDelete() : void {
    this.transaction.emit({deletedRecords: this.selectedRows});
  }

  onEditRows() : void {
    let dialogRef = this.dialog.open(AvColumnPropertiesComponent,
      {
      height: '600px',
      width: '600px',
        data: {columnsDefinition: this.dataColumns}}
    )

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('result', result);
        console.log(this.dataColumns);
        if (result) {
        this.dataColumns = result;
        console.log(this.dataColumns);
        this.columnsToShow = this.setColumnsToShow(this.standardColumns, this.dataColumns);
      }
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {environment} from "../../../environments/environment";
import {RequestService} from "../../common/http/request.service";
import {HttpClientModule} from "@angular/common/http";
import {AvTableConfig} from "../../av-components/AvTable/av-table/AvTableConfig";
import {AvTableColumnConfig} from "../../av-components/AvTable/av-table/AvTableColumnConfig";



@Component({
  selector: 'app-material-datatable',
  templateUrl: './material-datatable.component.html',
  styleUrls: ['./material-datatable.component.css'],
  providers: [ RequestService ]
})
export class MaterialDatatableComponent implements OnInit {

  exampleDataSource = null;

  constructor(private requestService : RequestService) {
  }

  ngOnInit() {

    this.exampleDataSource = [
      {'name': 'Marco',
      'role': 'Java and Angular Developer/Architect',
      'status': 'freelance'},
      {'name': 'Olivier',
        'role': 'Java Architect',
        'status': 'employee'},
      {'name': 'Sybille',
        'role': 'IT Manager',
        'status': 'employee'}
    ];
    this.requestService.getRestData('/rest/blockchain/company/list', environment.SPRNG_DATA).subscribe(
      result => {
        console.log(result);
        this.exampleDataSource = new MatTableDataSource<any>(result);
      });


    this.tableConfiguration = new AvTableConfig([
      {fieldName: 'name', label: 'name'},
      {fieldName: 'url', label: 'url'},
      {fieldName: 'city', label:'city'}
      ]);
  }

  tableConfiguration: AvTableConfig;
}




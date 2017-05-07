import { Component, OnInit } from '@angular/core';
import Conference from "../Conference";
import {RequestService} from "../../../common/http/request.service";
import ResponseInfo from "../../../common/technical-info/ResponseInfo";
import {Http, ResponseContentType} from "@angular/http";

@Component({
  selector: 'conference-table',
  templateUrl: './conference-table.component.html',
  styleUrls: ['./conference-table.component.css'],
  providers: [RequestService]
})
export class ConferenceTableComponent implements OnInit {

  conferenceList : Conference[];
  responseInfo : ResponseInfo;
  today : Date = new Date();

  constructor(private requestService : RequestService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.requestService.sendGet('/rest/jpa/conference').subscribe(
      result => {this.responseInfo = result ;
      this.conferenceList =result.text;
      for (let i = 0; i < this.conferenceList.length; i++) {
        this.conferenceList[i].daysLeft = this.daysLeft(this.conferenceList[i].begin);
      }
     });
  }

  daysLeft(start : Date) {
    return  Math.round((new Date(start).valueOf() - this.today.valueOf())/(1000*60*60*24));
  }

  downloadExcel() {
    this.requestService.sendGetType("/rest/jpa/conference/excel", ResponseContentType.ArrayBuffer)
      .subscribe(
        result => {
        this.downloadFile(result._body, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") },
        error => { console.log(error._body) })
  }

  downloadFile(data, format){
    let blob = new Blob([data], {type: format});

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, "conferences.xls");

    } else {
      let element = window.document.createElement('a');
      element.href=window.URL.createObjectURL(blob);
      element.download = "conferences.xls";
      element.click();
      document.body.removeChild(element);
    }
  }

}

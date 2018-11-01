import { Component, OnInit } from '@angular/core';
import Conference from "../Conference";
import {RequestService} from "../../../../common/http/request.service";
import ResponseInfo from "../../../../common/technical-info/ResponseInfo";
import {ResponseContentType} from "@angular/http";
import {environment} from "../../../../../environments/environment";
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

@Component({
  selector: 'conference-table',
  templateUrl: './conference-table.component.html',
  styleUrls: ['./conference-table.component.css'],
  providers: [RequestService],
  animations: [
    trigger('conferenceState', [
      state('active', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('deleted',   style({
        display: 'none'
      })),
      transition('* => deleted', animate('2s 10ms',
        keyframes([
        style({ opacity:'1', background:'#ff0000'}),
        style({ opacity: '0.5'}),
          style({ opacity: '0.4'}),
          style({ opacity: '0.3'}),
          style({ opacity: '0.2'}),
          style({ opacity: '0.1'}),
        ])))])]})
export class ConferenceTableComponent implements OnInit {

  conferenceList : Conference[];
  responseInfo : ResponseInfo;
  today : Date = new Date();

  constructor(private requestService : RequestService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.requestService.sendGet('/rest/conference', environment.SPRNG_DATA).subscribe(
      result => {this.responseInfo = result ;
      this.conferenceList =result.text;
      for (let i = 0; i < this.conferenceList.length; i++) {
        this.conferenceList[i].daysLeft = this.daysLeft(this.conferenceList[i].begin);
        this.conferenceList[i].cfpDaysLeft = this.daysLeft(this.conferenceList[i].cfp);
      }
     });
  }

  daysLeft(start : Date) {
    if (!start) {
      return -1;
    }
    return  Math.round((new Date(start).valueOf() - this.today.valueOf())/(1000*60*60*24));
  }

  downloadExcel() {
    this.requestService.sendGetType("/rest/conference/excel", ResponseContentType.ArrayBuffer)
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

  onDelete(conference:Conference){
    conference.state = 'deleted';
  }
}

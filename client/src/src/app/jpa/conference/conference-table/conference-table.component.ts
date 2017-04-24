import { Component, OnInit } from '@angular/core';
import Conference from "../Conference";
import {RequestService} from "../../../common/http/request.service";
import ResponseInfo from "../../../common/technical-info/ResponseInfo";

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

}

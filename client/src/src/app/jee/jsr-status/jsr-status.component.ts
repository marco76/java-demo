import { Component, OnInit } from '@angular/core';
import { JSRStatus } from './JSRStatus';
import {Observable} from "rxjs/Observable";
import {RequestService} from "../../common/http/request.service";

@Component({
  selector: 'app-jsr-status',
  templateUrl: './jsr-status.component.html',
  styleUrls: ['./jsr-status.component.css'],
  providers: [RequestService]
})
export class JsrStatusComponent implements OnInit {

  jsrStatusList : JSRStatus[];

  constructor(private requestService : RequestService) { }

  ngOnInit() {
    this.loadStatus().subscribe(
      result => { this.jsrStatusList = result; },
      error => { console.log(error._body) }
    );
  }

  getPhase(jsrStatus : any) : string {
    if (jsrStatus.status == 'Final Release') {
      return 'final';
    }

    if (jsrStatus.status == 'Final Approval Ballot' ||
      jsrStatus.status == 'Proposed Final Draft') {
      return 'ballot';
    }

    if (jsrStatus.status == 'Public Review') {
      return 'public';
    }

    if (jsrStatus.status == 'Public Review Ballot') {
      return 'public';
    }

    return 'normal';
  }

  loadStatus() : Observable<JSRStatus[]> {
    return this.requestService.simpleGetJson("/rest/read-file");

  }
}

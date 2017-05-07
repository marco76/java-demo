import { Component, OnInit } from '@angular/core';
import { JsrStatusService } from './jsr-status.service';
import { JSRStatus } from './JSRStatus';

@Component({
  selector: 'app-jsr-status',
  templateUrl: './jsr-status.component.html',
  styleUrls: ['./jsr-status.component.css'],
  providers: [JsrStatusService]
})
export class JsrStatusComponent implements OnInit {

  jsrStatusList : JSRStatus[];

  constructor(private jsrStatusService : JsrStatusService) { }

  ngOnInit() {
    this.jsrStatusService.loadStatus().subscribe(
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
}

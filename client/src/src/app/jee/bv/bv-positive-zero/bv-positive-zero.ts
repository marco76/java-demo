import { Component, OnInit} from '@angular/core';
import {RequestService} from "../../../common/http/request.service";
import ResponseInfo from "../../../common/technical-info/ResponseInfo";

@Component({
  selector: 'app-bv-positive-zero',
  templateUrl: './bv-positive-zero.html',
  styleUrls: ['./bv-positive-zero.css'],
  providers: [RequestService]
})
export class BvPositiveNegativeZero {

  model = {elevationOfDeathValley: null, numberOfBugsInYourCode: null, negativeNumberInFrBe: null, numberOfJavaDevelopers: null};
  code: string = "";
  request: string = "";
  responseInfo: ResponseInfo;

  constructor(private requestService: RequestService) {
  }

  onSubmit() {
    this.request = JSON.stringify(this.model);

    this.requestService.sendRequest('/rest/bv/positive-negative/numbers-bv', this.model).subscribe(
      result => {
        this.responseInfo = result
      });
  }

  onSubmitRS() {
    this.request = JSON.stringify(this.model);

    this.requestService.sendRequest('/rest/bv/positive-negative/numbers-rs', this.model).subscribe(
      result => {
        this.responseInfo = result
      });
  }
}

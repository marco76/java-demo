import { Component, OnInit } from '@angular/core';
import { PrettyJsonPipe } from "../../common/pretty-json/prettyJson.pipe";
import {RequestService} from "../../common/http/request.service";
import ResponseInfo from "../../common/technical-info/ResponseInfo";

@Component({
  selector: 'app-bv-list-email',
  templateUrl: './bv-list-email.component.html',
  styleUrls: ['./bv-list-email.component.css'],
  providers: [RequestService, PrettyJsonPipe]
})
export class BvListEmail implements OnInit {

  addresses = {email : [null, null, null]};

  responseInfo : ResponseInfo;
  code :string = "";
  request : any;

  constructor(private requestService : RequestService) { }

  ngOnInit() {

    this.code =
      `<pre>
     [GitHub link]
    <code class="java highlight">
    public class Addresses {
    @Size(max = 2)
    private List<@Email @NotNull String> emailList = new ArrayList<>();
    </code></pre></div>`
  }

  doSubmit() {

    let emailList = [];
    for (let i = 0; i < this.addresses.email.length; i++) {
      if (this.addresses.email[i]) {
        emailList.push(this.addresses.email[i]);
      }
    }
    // trick to fire the update field event
    this.request = JSON.stringify(emailList);

    this.requestService.sendRequest('/rest/bv/email/list', emailList).subscribe(
      result => {this.responseInfo = result});
  }
}

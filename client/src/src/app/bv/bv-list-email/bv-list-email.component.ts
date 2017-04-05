import { Component, OnInit } from '@angular/core';
import {BvService} from "../common/bv.service";
import {PrettyJsonPipe} from "../../common/pretty-json/prettyJson.pipe";

@Component({
  selector: 'app-bv-list-email',
  templateUrl: './bv-list-email.component.html',
  styleUrls: ['./bv-list-email.component.css'],
  providers: [BvService, PrettyJsonPipe]
})
export class BvListEmail implements OnInit {

  addresses = {email : [null, null, null]};

  response : any;
  code :string = "";
  request : any;

  constructor(private bvService : BvService) { }

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



    this.bvService.saveListEmail(emailList).subscribe(
      result => { this.response = result },
      error => { this.response = error._body }
    );
  }
}

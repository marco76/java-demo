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

    this.code = `With Bean Validaton you can easily validate elements in generic containers (<i>Map</i>, <i>List</i>, <i>Optional</i> etc.). <br><br>More constraints can be combined. In this example we validate the size and the content of a List.
<ul><li>The constraint <i>@Size</i> limits the size of the list to 2 values.</li>
<li>The values have to be valid emails (<i>@Email</i>).</li>
</ul>You can find more information in the <a href="http://beanvalidation.org/2.0/spec/#constraintdeclarationvalidationprocess-containerelementconstraints" target="_blank">
specifications</a>.

<pre><code class="java highlight">public class Addresses {
  @Size(max = 2)
  private List<<@Email @NotNull String>> emailList = new ArrayList<<>>();
}</code></pre></div>`
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

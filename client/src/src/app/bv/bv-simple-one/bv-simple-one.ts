import { Component, OnInit} from '@angular/core';
import {RequestService} from "../../common/http/request.service";
import ResponseInfo from "../../common/technical-info/ResponseInfo";

@Component({
  selector: 'app-bv-simple-one',
  templateUrl: './bv-simple-one.html',
  styleUrls: ['./bv-simple-one.css'],
  providers: [RequestService]
})
export class BvSimpleOneComponent implements OnInit {

  model = {email : null, name:null};
  code: string = "";
  request: string = "";
  responseInfo: ResponseInfo;

  constructor(private requestService: RequestService) {
  }

  onSubmit() {
    this.request = JSON.stringify(this.model);

    this.requestService.sendRequest('/rest/bv/participant', this.model).subscribe(
      result => {
        this.responseInfo = result
      });
  }

  ngOnInit() {
    this.code = `<pre><code class="java highlight">
    public class Participant {

    // The name can be long only between 3 and 20 char
    @Size(min = 3, max = 20)
    private String name;

    // The email is mandatory (@NotNull)
    // Validation of the correct format of the email
    @NotNull @Email
    private String email;
    ...
    }</code></pre>`;
    }

}

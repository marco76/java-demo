import { Component, OnInit} from '@angular/core';
import {BvService} from "../common/bv.service";

@Component({
  selector: 'app-bv-simple-one',
  templateUrl: './bv-simple-one.html',
  styleUrls: ['./bv-simple-one.css'],
  providers: [BvService]
})
export class BvSimpleOneComponent implements OnInit {

  model = new Object();
  code: string = "";
  request: string = "";
  response: string = "";

  constructor(private bvService: BvService) {
  }

  onSubmit() {
    this.request = JSON.stringify(this.model);

    this.bvService.saveParticipant(this.model).subscribe(
      result => {
        this.response = result
      },
      error => {
        this.response = error._body
      }
    );
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

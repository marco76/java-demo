import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../common/http/request.service";
import ResponseInfo from "../../common/technical-info/ResponseInfo";


@Component({
  selector: 'app-bv-date',
  templateUrl: './bv-date.component.html',
  styleUrls: ['./bv-date.component.css'],
  providers: [RequestService]
})
export class BvDateComponent implements OnInit {

  model = {name :null, nextAppointment:null, yearOfBirth: null};
  code: string = "";
  request: string = "";
  responseInfo : ResponseInfo;
  datee : any;

  constructor(private requestService : RequestService) {
    this.model.nextAppointment = new Date();
  }

  onSubmit() {

    if (this.model.nextAppointment instanceof Date) {
      this.model.nextAppointment = this.model.nextAppointment.toISOString().split('T')[0];
    }

    this.request = JSON.stringify(this.model);

    this.requestService.sendRequest('/rest/bv/time/patient', this.model).subscribe(
      result => {this.responseInfo = result});
  }

  ngOnInit() {
    this.code = `
    The business class is validated using the new java.time API:
    <pre><code class="java highlight">public class Patient {

    @NotEmpty @Size(min = 3, max = 50)
    private String name;

    @Past
    private Year yearOfBirth;

    @Future(orPresent = true)
    private LocalDate nextAppointment</code></pre>
    
    The REST service receive a DTO in JSON format (SimplePatientDTO).
    All the fields are in String format.
    <pre><code class="java highlight">    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("patient")
    public Response user(@Valid SimplePatientDTO simplePatientDTO) </code></pre>
    <pre><code class="java highlight">public class SimplePatientDTO {
    @NotEmpty
    private String name;
    @NotNull
    private Integer yearOfBirth;
    @NotNull @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}")
    private String nextAppointment;</code></pre>
    `
  }
}

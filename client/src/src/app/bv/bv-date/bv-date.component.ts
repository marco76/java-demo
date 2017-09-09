import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../common/http/request.service";
import ResponseInfo from "../../common/technical-info/ResponseInfo";
import { Patient } from "./Patient";
import { IMyDate, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';


@Component({
  selector: 'app-bv-date',
  templateUrl: './bv-date.component.html',
  styleUrls: ['./bv-date.component.css'],
  providers: [RequestService]
})
export class BvDateComponent implements OnInit {

  model : Patient = new Patient();
  code: string = "";
  request: string = "";
  responseInfo : ResponseInfo;
  nextAppointmentJS : IMyDate = {year: 0, month: 0, day: 0};

  isPossibleToSave : boolean = true;

  constructor(private requestService : RequestService) {

    let d: Date = new Date();
    this.nextAppointmentJS = {year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()};
  }

  onSubmit() {

    if (this.nextAppointmentJS.day) {
      this.model.nextAppointment = `${this.nextAppointmentJS.year}-${this.nextAppointmentJS.month}-${this.nextAppointmentJS.day}`;
    }
    this.request = JSON.stringify(this.model);

    this.requestService
      .sendRequest('/rest/bv/time/patient', this.model)
      .subscribe(result => {this.responseInfo = result});
  }

  onDateChanged(event: IMyDateModel) {
    // Update value of selDate variable
    this.nextAppointmentJS = event.date;
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.isPossibleToSave = event.valid;
   }

  ngOnInit() {

    this.code = `
    The business class is validated using the new java.time API
    and some new annotations:<br><br>
<i>@NotEmpty</i>: Empty strings (filled with spaces) like '   ' are not allowed.<br>

<i>@Past</i>: The Year has to be in the past (< this Year).<br>

<i>@Future(orPresent = true)</i>: The date has to be >= than today.<br><br>

<pre><code class="java highlight">public class Patient {

@NotNull @NotEmpty @Size(min = 3, max = 50)
private String name;

@Past @JsonDeserialize(using = YearDeserializer.class)
private Year yearOfBirth;

@NotNull @Future(orPresent = true)
@JsonDeserialize(using = JsDateDeserializer.class)
private LocalDate nextAppointment;</code></pre>
    
    The REST service receive a JSON string that is converted
     into a Patient Java object. This object is automatically validated.
     If the validation succeed a response HTTP 200 is returned, in case some
     values are not valid an error HTTP 400 is returned.
<br><br>
To call the validation is enough to use the <b>@Valid</b> annotation before the parameter
in your resource method. <a href ="https://docs.oracle.com/javaee/7/tutorial/jaxrs-advanced002.htm" target="_blank">JAX-RS takes care of the rest.</a>
     
     <br>Here the complete (!) resource class:
    <pre><code class="java highlight">@javax.ws.rs.Path("bv/time")
public class BvTimeController \{

    public BvTimeController() \{ }

    @POST @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("patient")
    public Response user(@Valid Patient patient) {
        return Response.ok().build();
    }
}</code></pre>
`
  }
}

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
    this.code = `
This is a simple example that shows how to execute a simple validation using Bean Validation.
<br>
For RESTful services the validation can be done directly by JAX-RS, in the following example we will call 'manually' the validator.

<br>Here the class to validate, the annotations define the validation rules.
<br>You can find <a href="http://beanvalidation.org/2.0/spec/#builtinconstraints" target="_blank">here the list of constraints</a>
<br><i>@Email</i>: is a new constraint introduced with BV 2.0.
<pre><code class="java highlight">public class Participant {

// The name can be long only between 3 and 20 char, it can be null
@Size(min = 3, max = 20)
private String name;

// The email is mandatory (@NotNull)
// Validation of the correct format of the email
@NotNull @Email
private String email;

[...]}</code></pre>

To validate the object we need an instance of a Validator, because we are using
a <a href="http://beanvalidation.org/2.0/spec/#constraintsdefinitionimplementation-constraintfactory" target="_blank">Java EE server</a> we can simply ask the server to inject the resource for us with <i>@Resource</i>.
<br>To validate the object we call the method <i><a href="http://beanvalidation.org/2.0/spec/2.0.0.alpha2/#validationapi-validatorapi-validationmethods" target="_blank">validate</a></i> of the Validator.
We receive a <a href="http://beanvalidation.org/2.0/spec/2.0.0.alpha2/#validationapi-constraintviolation" target="_blank">ConstraintViolation </a> object that contains the errors of the validation.
You can see an example of error messages using this demo.
<br>
Here the complete code (ResponseFactory is used to render the result in Angular):
<pre><code class="java highlight">@javax.ws.rs.Path("bv")
public class BvController {

    @Inject ResponseFactory<Participant> responseFactory;
    @Inject Validator validator;

    @POST @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("participant")
    public Response validateParticipant(Participant participant) {

      ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
      Validator validator = factory.getValidator();
      Set<<ConstraintViolation<<Participant>>>> constraintViolationSet = validator.validate(participant);

      return responseFactory.buildResponse(constraintViolationSet);
    }
  }
</code></pre>

`;
  }
}

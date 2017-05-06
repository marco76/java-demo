import { Component, OnInit } from '@angular/core';
import { PrettyJsonPipe } from "../../common/pretty-json/prettyJson.pipe";
import ResponseInfo from "../../common/technical-info/ResponseInfo";
import { RequestService } from "../../common/http/request.service";

@Component({
  selector: 'app-event',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  providers: [RequestService, PrettyJsonPipe]
})
export class HelloComponent implements OnInit {

  feature : string = "getHello";
  person : {name : string, age:number};
  responseInfo : ResponseInfo;
  code :string = "";
  request : any;
  xml : boolean = false;

  constructor(private requestService : RequestService) { }

  ngOnInit() {
    this.person = { name : undefined, age : undefined};

    this.code = `This example is dedicated to my friend Y., a brilliant and curious developer that recently
       expressed to me the feeling of many young developers towards Java:
     <blockquote>'The problem with the new front-end technologies is that in respect to other languages
     Java does not provide simple APIs in the standard library.
     It is cumbersome to create for example a REST-API with Java as the JSON serialization is cumbersome.'</blockquote>
     
     <i>How we can do easier and better to convince the developers to discover and enjoy Java ??? ;-)</i>
     
    <br>
    <br>
    Packages imported (all in the standard library!):
    <pre><code class="java highlight">import javax.json.*;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;</code> </pre>

The full class with the REST resources producing a simple GET and
2 POST responses with
<ul><li> de-serialization of a JSON string to a Java Object</li>
<li>validation of the Java Object</li>
<li>re-serialization of the Java Object to JSON or XML according to the protocol chosen by the JS client</li>
</ul>    
    <pre><code class="java highlight">@Path("/hello")
public class MiniController {

    @GET
    public JsonObject helloWorld() {
        return Json.createObjectBuilder()
            .add("message","Hello World from Java EE!")
            .build();
    }

    @POST @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Person greetingsJSON(@Valid Person person) {
        return person;
    }
}</code></pre>
    
Here the Java bean omitted getter/setter
<pre><code class="java highlight">@XmlRootElement(name = "Person")
public class Person {
private static final String DEFAULT_MESSAGE =
    "Example of message from the server for: %s";

@NotEmpty @Size(min = 3, max = 20)
private String name;

@NotNull @Min(14) @Max(150)
private Integer age;

private String message;
}
</code></pre></div>

Here the endpoint of the resource
<pre><code class="java highlight">@ApplicationPath(value = "rest")
public class RestApplication extends Application{}
</code></pre></div>

This is really ALL the code needed to create this demo with JAVA EE
<br><br><br>`}

  onSubmit() {
    if (this.feature == 'getHello') {
      this.requestService.sendGet('/rest/hello').subscribe(
        result => {this.responseInfo = result});
    } else if (this.feature == 'postPerson') {
      this.request = JSON.stringify(this.person);

      if (this.xml) {
        this.requestService.sendRequestForXML('/rest/hello', this.person).subscribe(
          result => {
            this.responseInfo = result;
            this.responseInfo._format = 'xml';
          });
      } else {
        this.requestService.sendRequest('/rest/hello', this.person).subscribe(
          result => {
            this.responseInfo = result;
            this.responseInfo._format = 'json';
          });
      }
    }
  }
}

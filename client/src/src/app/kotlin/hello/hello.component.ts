import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../common/http/request.service";
import ResponseInfo from "../../common/technical-info/ResponseInfo";
import {PrettyJsonPipe} from "../../common/pretty-json/prettyJson.pipe";


@Component({
  selector: 'app-kotlin-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  providers: [RequestService, PrettyJsonPipe]
})
export class KotlinHelloComponent implements OnInit {

  code: string = "";
  request: string = "";
  responseInfo : ResponseInfo;
  name : string = "";
  logo = "assets/logo/logo.png";

  constructor(private requestService : RequestService, private prettyJson : PrettyJsonPipe) {}

  onSubmit() {
    let form = new URLSearchParams();
    form.append('name', this.name);

    this.requestService.sendGetForm('/rest/kotlin/hello', form).subscribe(
      result => {this.responseInfo= result;
        this.responseInfo.text = this.formatToJson(result.text)
        console.log(this.responseInfo)});
  }

  formatToJson(json : any) : string {
    return  `<pre><code class="json highlight">` +
      this.prettyJson.transform(json)+ `</code></pre>`;
  }

  ngOnInit() {

    this.code = `
    Here we show how easy is to use Kotlin in your Java EE application.<br>
    The example is inspired by the official <a href="https://kotlinlang.org/docs/tutorials/spring-boot-restful.html" target="_blank">kotlin documentation</a>.
    
    We extend the example with a <i><a href="https://kotlinlang.org/docs/reference/object-declarations.html#companion-objects" target="_blank">companion object</a></i> to add some logs
     and the validation offered by
     <a href="http://beanvalidation.org/" target="_blank">Bean Validation</a>. BV is part of JavaEE and we don't have to add it to the project.
     <br><br>
1) We create a Jax-RS Resource in Kotlin using standard Java EE annotations: <i>KotlinController.kt</i> 

<pre><code class="kotilin highlight">@Path("/kotlin")
open class GreetingController \{

  companion object \{
    val LOG = Logger.getLogger(
      GreetingController::class.java.name)
  }

  open val counter = AtomicLong()

  @GET @Path("/hello") @Produces(MediaType.APPLICATION_JSON)
  open fun greeting(@NotEmpty @QueryParam("name") name
    : String): Greeting \{
    LOG.log(Level.INFO, "greeting %s", name);
    
    return Greeting(counter.incrementAndGet(),
      "Kotlin says: Hello, $name")
  }
}</code></pre>
        
 <br>2) In Kotlin a bean that simply hold the data is a <a href ="https://kotlinlang.org/docs/reference/data-classes.html" target="_blank"><i>data class</i></a>.
 In our project we add <i>Greeting.kt</i> and we implement the data class with only 1 line of code:
 <pre><code class="kotlin highlight">data class Greeting(val id: Long, val content: String)</code></pre>
 <br>
 3) To compile the Kotlin sources in Java you have to adapt your maven <i>pom.xml</i> according to this <a href="https://kotlinlang.org/docs/reference/using-maven.html"
  target="_blank">documentation</a> (or simply check our GitHub sources).
`
  }
}

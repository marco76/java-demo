import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../common/http/request.service";
import {PrettyJsonPipe} from "../../common/pretty-json/prettyJson.pipe";

@Component({
  selector: 'quiz-hello',
  templateUrl: './quiz-hello.component.html',
  styleUrls: ['./quiz-hello.component.css'],
  providers: [RequestService, PrettyJsonPipe]
})
export class QuizHelloComponent implements OnInit {

  request: string = "";
  code: string;
  serverResponse: string;
  answer: string;

  constructor(private requestService : RequestService, private prettyJson : PrettyJsonPipe) { }

  ngOnInit() {
    this.code = `Original question: 'What does invoking hello() output?'
    <br>
    <pre><code class="java highlight">// ... in a managed bean

@Inject
Hello hello;
    
public Hello hello(){
    return hello;
}</code></pre>
        
A second class:
<pre><code class="java highlight">// ... another class
public class Hello {
  @Override
  public String toString() {
    return "hello";
}`;
    this.answer= `<p>The Hello <b>instance</b> and not the String 'hello' or null.</p>
  There is a trick in the question and more answers are possible:
  <p>1) Without <i>beans.xml</i> in WEB-INF the application doesn't start because the
   class <i>Hello</i> cannot be injected (it's not a bean managed by the server). <a href="https://docs.oracle.com/javaee/7/tutorial/cdi-adv001.htm">Here the documentation.</a>
   </p>
  <p>2) If <i>beans.xml</i> is present or the <i>Hello.java</i> is annotated (like in our case with <i>@ManagedBean</i>) then the code works.
  The result is the <b>Object</b> <i>Hello</i> and not the <i>String</i> 'Hello'. Many developers try to solve the quiz with <i>System.out.println(hello())</i> and they see the result 'hello' thinking that this is the correct solution.
  In reality <i>hello()</i> returns the instance of the class.
  </p>
  
  To build our implementation we used:
  <br>
A REST resource
<pre><code class="java highlight">@Path("/quiz/hello")
public class QuizHelloController {

@Inject HelloService service;

@GET
public JsonObject answer(){
  
   JsonObjectBuilder jsonObjectBuilder =
     Json.createObjectBuilder()
        .add("service.hello().getClass().getSimpleName()",
           helloService.hello().getClass().getSimpleName())
        .add("service.hello().getClass().getName()",
           service.hello().getClass().getName())
        .add("service.hello().toString()",
           service.hello().toString())
        .add("service.hello() instanceof Hello",
           service.hello() instanceof Hello);
    
    return jsonObjectBuilder.build();
  }
}
</code></pre>

A Stateless bean (service):
<pre><code class="java highlight">@Stateless
public class HelloService {

    @Inject Hello hello;
    public Hello hello() {
        return hello;
    }
}</code></pre> 

And the Hello class:
<pre><code class="java highlight">//With @ManagedBean we avoid beans.xml
@ManagedBean
public class Hello {

    @Override
    public String toString() \{
        return "Hello";
    }
}</code></pre>
`}

  onSubmit() {
     this.requestService.sendGet("/rest/quiz/hello").subscribe(
      result => {
        this.serverResponse= this.formatToJson(result.text);
      },
      error => {
        console.log(error._body)
      }
    );
  }

  formatToJson(json : any) : string {
    return  `<pre><code class="json highlight">` +
      this.prettyJson.transform(json)+ `</code></pre>`;
  }


}

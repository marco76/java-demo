import { Component, OnInit } from '@angular/core';
import {BvService} from "../common/bv.service";
import {PrettyJsonPipe} from "../../common/pretty-json/prettyJson.pipe";
import {SimpleUser} from './SimpleUser'

@Component({
  selector: 'app-bv-repeatable',
  templateUrl: './bv-repeatable.component.html',
  styleUrls: ['./bv-repeatable.component.css'],
  providers: [BvService, PrettyJsonPipe]
})
export class BvRepeatableComponent implements OnInit {

  model = new SimpleUser();
  response : any;
  code :string = "";
  request : any;

  constructor(private bvService : BvService) { }

  ngOnInit() {

    this.code =
      `<pre>
     [GitHub link]
    <code class="java highlight">
    // JAX-RS validates the JSON converted to a Java Object using Bean Validation
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("user")
    public Response user(@Valid SimpleUserDTO simpleUserDTO) {
    ...
    }
    
    // Transfer bean JS -> JSON -> Java
    public class SimpleUserDTO {

    @NotNull
    private String type;
    @NotEmpty
    private String password;
    </code></pre>
    
    Validation of the converted object using repeatables, if the user is of type admin the password has to be 12 char lenght:
 
    <pre><code class="java highlight">
    public class User {
        @NotEmpty @Size(min = 8, groups = Default.class)
        @NotEmpty @Size(min = 12, groups = Admin.class)
        private String password;
        ...
        }
</code></pre></div>`
  }

  doRepeatableOne() {

    // trick to fire the update field event
    this.request = JSON.stringify(this.model);

    this.bvService.repeatableDemo1(this.model).subscribe(
      result => { this.response = result },
      error => { this.response = error._body }
    );
  }
}

import { Component, OnInit } from '@angular/core';

import ResponseInfo from "../../common/technical-info/ResponseInfo";
import Credentials from "../../common/http/Credentials";
import {AuthenticationService} from "../../common/http/authentication.service";
import {RequestService} from "../../common/http/request.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, RequestService]
})
export class LoginComponent implements OnInit {

  model : Credentials = new Credentials();
  responseInfo : ResponseInfo;
  public alerts: any = [];

  code: string = "";
  web: string = "";
  authentication : string = "";
  store : string = "";
  login : string = "";
  secResource : string = "";
  imgSecurity = "assets/images/security.svg";
  quoteList: any = undefined;

  constructor(private authenticationService : AuthenticationService, private requestService: RequestService) { }

  ngOnInit() {

    this.code = `This is an example of custom implementation of the new Security API (<a href="https://github.com/javaee-security-spec/soteria" target="_blank">Soteria</a>) included in Java EE 8.
      <br><br>We added some protected RESTful services in this demo that only an authenticated user can access.
      <br><br>To maintain the application fully RESTful we don't want to store any user session on the server.
<br>
<h4>Steps</h4> 
To implement our example we need following elements:
<ul>
<li> <a target="_blank" href="https://github.com/javaee-security-spec/security-api/blob/master/src/main/java/javax/security/authentication/mechanism/http/HttpAuthenticationMechanism.java"> HttpAuthenticationMechanism</a> : obtains the user's credentials</li>
<li> <a target="_blank" href="https://github.com/javaee-security-spec/security-api/blob/master/src/main/java/javax/security/identitystore/IdentityStore.java">IdentityStore</a> : validates the user's credentials</li>
<li> <a target="_blank" href="">Login resource</a> : asks the user's credentials to the client</li>      
<li> web.xml: adds the url of the secured resources</li>
<li> <a target="_blank" href="<a target="_blank" href="https://docs.oracle.com/cd/E19798-01/821-1841/gjjcd/index.html">A protected resource</a> : resource accessible only to authorized users</li>      
</ul>
`;
    this.web=`<br>In web.xml we need to declare which REST ressources are accessible only to authenticated users:

 <pre><div class="xml highlight">&lt;security-constraint&gt;
  &lt;web-resource-collection&gt;
    &lt;web-resource-name&gt;Protected resources&lt;/web-resource-name&gt;
    &lt;url-pattern>>/rest/protected/*&lt;/url-pattern&gt;
  &lt;/web-resource-collection&gt;
  &lt;auth-constraint&gt;
    &lt;role-name&gt;user&lt;/role-name&gt;
  &lt;/auth-constraint&gt;
&lt;/security-constraint&gt;</div></pre>
`;
    this.authentication=`<br>The security API uses the notion of authentication mechanism to validate the access.
<br><br>We implement the interface <a href = "https://github.com/javaee-security-spec/security-api/blob/master/src/main/java/javax/security/authentication/mechanism/http/HttpAuthenticationMechanism.java" target="_blank">HttpAuthenticationMechanism</a> to define how the users have access to the resource.
<br><br>This implementation is very similar to the <a href="https://github.com/javaee-security-spec/soteria/blob/master/impl/src/main/java/org/glassfish/soteria/mechanisms/BasicAuthenticationMechanism.java" target="_blank">BasicAuthenticationMechanism</a> offered by Soteria.
<br><br>The RI (<a href = "https://github.com/javaee-security-spec/soteria" target="_blank">Soteria</a>) includes some predefined implementations (e.g. Basic, CustomForm, Form). In our example we will create a custom authentication mechanism for the <a href = "https://docs.oracle.com/javaee/7/tutorial/security-webtier002.htm#BNCBP" target="_blank">Basic authentication</a> 
<br><br>We require that every request contains the username and password of the user in the header ('Authentication:  Basic [encrypted credentials]'). The encrypted credential are stored in the client session, in a real application you should use more safe solution (e.g. token).
<br><br>The authentication mechanism is executed for each HTTP request (for protected and not protected resources) before the filters.
<br><br>The complete code is available on <a href="https://github.com/marco76/java-demo/tree/master/server/src/main/java/io/javademo/examples/security" target="_blank">GitHub</a>. Here some relevant fragments :

<pre><div class="java highlight">@RequestScoped
public class CustomAuthMechanism implements HttpAuthenticationMechanism {
  
  @Inject
  CustomIdentityStore customIdentityStore;

  @Override
  public AuthenticationStatus validateRequest(HttpServletRequest request, HttpServletResponse response, HttpMessageContext httpMessageContext) throws AuthException {

    Credential credential = null;
       
    // we extract the credentials (username /  password) from the header of the request
    String[] credentials = extractCredentials(request);

    if (credentials != null && credentials.length == 2) \{
      credential = new UsernamePasswordCredential(credentials[0], credentials[1]);
    } else \{
      // this is a wrapper to a JASPIC method
      if (httpMessageContext.isProtected()) \{
        // if there are no credentials and the resource is protected
        // we answer with a 401 code
        response.setStatus(Response.Status.UNAUTHORIZED.getStatusCode());
        return AuthenticationStatus.SEND_FAILURE;
      } else \{
        // there are no credentials but the resource is not protected
        // we don't do anything
        return httpMessageContext.doNothing();
      }
    }
  
    // validation of the credential using the identity store
    CredentialValidationResult result = customIdentityStore.validate(credential);

    if (result.getStatus() == CredentialValidationResult.Status.VALID) \{

      // we tell to the container that the user is valid and we return SUCCESS
      return httpMessageContext.notifyContainerAboutLogin(
        result.getCallerPrincipal(), result.getCallerGroups());
    } else \{

      // the authentication failed, we return the code 401 in the http response
      response.setStatus(Response.Status.UNAUTHORIZED.getStatusCode());
        return AuthenticationStatus.SEND_FAILURE;
    }
}</div></pre>
`;
    this.store=`<br>The identity store obtains identity data from a persistence mechanism.
<br>This can be e.g. a database, file or a LDAP server. Soteria includes implementations for these repositories. 
<br><br>
In our simple example we show how to implement a custom IdentityStore that accepts every username using 'secret' as password.

<pre><div class="java highlight">@ApplicationScoped
public class CustomIdentityStore implements IdentityStore \{

  @Override
  public CredentialValidationResult validate(Credential credential) \{

    UsernamePasswordCredential usernamePasswordCredential = (UsernamePasswordCredential) credential;

    // if the password is 'secret' the validation succeed!
    if (usernamePasswordCredential.getPassword().compareTo("secret")) \{

      // we assign the user to the group 'user' and return the validation result
      return new CredentialValidationResult(usernamePasswordCredential.getCaller(),
        new HashSet<>(asList("user")));
    }

    return INVALID_RESULT;
  }
}
</div></pre>
`;
    this.login=`<br>We add a login RESTful resource as entry point for the user. In this demo every request is authenticated, the login is not really needed but it will be useful for the future integration of JWT (Basic Auth + Token).
<br><br>
Interesting for us is the use of SecurityContext. This interface allow the communication between the business code and the Java Security API. In this example we retrieve the username of the user logged in.
<pre><div class="java highlight">@Path("auth")
public class AuthController \{

  @Inject
  private SecurityContext securityContext;

  @GET @Path("login")
  public Response result(@Context HttpServletRequest request, @Context HttpServletResponse response) \{

    if (securityContext.getCallerPrincipal() != null) \{

      JsonObject result = Json.createObjectBuilder()
        .add("username", securityContext.getCallerPrincipal().getName())
        .build();

      return Response.ok(result).build();
    }

    return Response.status(Response.Status.UNAUTHORIZED).build();
  }
}
</div></pre>
`;

    this.secResource=`<br>The protected resource is a simple RESTful resource with the URI inclued in the <a target="_blank" href="https://docs.oracle.com/cd/E19798-01/821-1841/gjjcd/index.html">Web Resource Collection</a>.

<pre><div class="java highlight">@Path("protected")
public class ProtectedController \{
  @RolesAllowed(\{"user"})
  @GET @Path("hello")
  public Response securedMethod(@Context HttpServletRequest request, @Context HttpServletResponse response) \{
    JsonObject result = Json.createObjectBuilder()
                .add("message", "???'")
                .add("author", "???")
                .build();
    return Response.ok(result).build();
  }
}
</div></pre>
`;
  }

  onSubmit() {
    this.alerts = [];
    this.quoteList = undefined;

    this.authenticationService.sendAuthRequest('/rest/auth/login', this.model).subscribe(
      result => {
      if (result.status == 401) {
        this.alerts.push({
          type: 'warning',
          msg: `Login failed [HTTP code 401], try to use the password 'secret'! (${(new Date()).toLocaleTimeString()})`,
          timeout: 30000
        });
      } else {
        if (result.status == 200) {
          this.alerts.push({
            type: 'info',
            msg: `Login succeeded [HTTP code 200]!!! (${(new Date()).toLocaleTimeString()})`,
            timeout: 30000
          });
        }
      }});
  }

  logOut() {
    this.authenticationService.logout()
  }

  onProtected() {
    console.log("onProtected");
    this.alerts = [];

    this.requestService.simpleGet('/rest/protected/hello').subscribe(
      result => {
        if (result.status == 401) {
          this.alerts.push({
            type: 'danger',
            msg: `Access refused [HTTP code 401], you have to login to access this resource (/rest/protected/hello)! (${(new Date()).toLocaleTimeString()})`,
            timeout: 30000
          });
        } else {
          if (result.status == 200) {
            this.alerts.push({
              type: 'success',
              msg: `Access to the protected resource allowed [HTTP code 200]!!! (${(new Date()).toLocaleTimeString()})`,
              timeout: 30000
            });
            console.log(result.json());
            this.quoteList = result.json();

          }
        }});
  }

  isLoggedIn() : boolean {
    return this.authenticationService.isAuthenticated();
  }

}

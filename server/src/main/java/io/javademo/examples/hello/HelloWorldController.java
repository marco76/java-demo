package io.javademo.examples.hello;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.print.attribute.standard.Media;
import javax.ws.rs.GET;
import javax.ws.rs.MatrixParam;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * 3.1 Resource Classes
 * A resource class is a Java class that uses JAX-RS annotations to implement a corresponding Web resource.
 * Resource classes are POJOs that have at least one method annotated with @Path or a request method desig- nator.
 */
@javax.ws.rs.Path("helloworld")
public class HelloWorldController {


    /**
     * 3.1.1 Lifecycle and Environment
     * By default a new resource class instance is created for each request to that resource.
     * First the constructor (see Section 3.1.2) is called, then any requested dependencies are injected (see Section 3.2),
     * then the appropriate method (see Section 3.3) is invoked and finally the object is made available for garbage collection.
     */
    public HelloWorldController() {

    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHtml() {

        JsonObject jsonObject = Json.createObjectBuilder()
                .add("result", "Here Java answering  ... Hello World!").build();

        return Response.ok().entity(jsonObject).build();

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJsonName() {

        return Response.ok().entity("Hello").build();
    }
}

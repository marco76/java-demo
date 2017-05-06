package io.javademo.examples.minimalistic;

import javax.json.*;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by marcomolteni on 20.04.17.
 */

@Path("/hello")
public class MiniController {

    @GET
    public JsonObject helloWorld() {
        return Json.createObjectBuilder().add("message","Hello World from Java EE!").build();
    }

    @POST @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Person greetingsJSON(@Valid Person person) {
        return person;
    }
}

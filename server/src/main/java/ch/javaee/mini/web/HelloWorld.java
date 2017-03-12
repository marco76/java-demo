package ch.javaee.mini.web;

import javax.json.Json;
import javax.json.JsonObject;
import javax.print.attribute.standard.Media;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by marco on 11.03.17.
 */
@javax.ws.rs.Path("helloworld")
public class HelloWorld {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHtml() {

        JsonObject jsonObject = Json.createObjectBuilder()
                .add("result", "Here Java answering  ... Hello World!").build();

        return Response.ok().entity(jsonObject).build();

    }
}

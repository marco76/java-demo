package ch.javaee.mini.web;

import javax.json.Json;

import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@javax.ws.rs.Path("validation")
public class ValidationController {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHtml() {


        JsonObject jsonObject = Json.createObjectBuilder()
                .build();

        return Response.ok().entity(jsonObject).build();

    }

}

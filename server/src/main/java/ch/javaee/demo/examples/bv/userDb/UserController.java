package ch.javaee.demo.examples.bv.userDb;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path(value = "/user")
public class UserController {


    @EJB
    private UserDB userDB;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserList() {

        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

        for (User user : userDB.getUserList()) {

            JsonObjectBuilder userJsonBuilder = Json.createObjectBuilder();

            userJsonBuilder.add("name", user.getName());
            userJsonBuilder.add("username", user.getUsername());
            userJsonBuilder.add("yearOfBirth", user.getYearOfBirth());

            jsonArrayBuilder.add(userJsonBuilder);
        }

        return Response.ok().entity(jsonArrayBuilder.build()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(User user) {

        User userSaved = userDB.addUser(user);

        return Response.ok().entity(userSaved).build();

    }

}

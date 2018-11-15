package io.javademo.examples.security;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;


import javax.security.enterprise.SecurityContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 03.06.17.
 */
@Path("auth")
public class AuthController {

    private static final Logger LOGGER = Logger.getLogger(AuthController.class.getName());

    @Inject
    private SecurityContext securityContext;

    @GET
    @Path("login")
    public Response result(@Context HttpServletRequest request, @Context HttpServletResponse response) {

        LOGGER.log(Level.INFO, "login");

        if (securityContext.getCallerPrincipal() != null) {

            JsonObject result = Json.createObjectBuilder()
                    .add("username", securityContext.getCallerPrincipal().getName())
                    .build();

            return Response.ok(result).build();
        }

         return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}

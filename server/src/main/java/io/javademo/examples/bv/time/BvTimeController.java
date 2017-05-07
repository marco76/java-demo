package io.javademo.examples.bv.time;

import javax.validation.Valid;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@javax.ws.rs.Path("bv/time")
public class BvTimeController {

    public BvTimeController() { }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("patient")
    public Response user(@Valid Patient patient) {
        return Response.ok().build();
    }
}

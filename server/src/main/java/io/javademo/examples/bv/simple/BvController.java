package io.javademo.examples.bv.simple;

import io.javademo.common.web.response.ResponseFactory;

import javax.inject.Inject;
import javax.validation.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Set;
import java.util.logging.Logger;

@javax.ws.rs.Path("bv")
public class BvController {

    private static final Logger LOGGER = Logger.getLogger(BvController.class.getName());

    @Inject
    ResponseFactory<Participant> responseFactory;
    @Inject
    Validator validator;

    public BvController() {

    }


    @POST @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("participant")
    public Response validateParticipant(Participant participant) {
        LOGGER.info("validateParticipant");

        Set<ConstraintViolation<Participant>> constraintViolationSet = validator.validate(participant);

        return responseFactory.buildResponse(constraintViolationSet);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJsonName() {

        return Response.ok().entity("Hello").build();
    }
}

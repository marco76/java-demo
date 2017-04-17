package io.javademo.examples.bv.simple;

import io.javademo.common.web.response.ResponseFactory;

import javax.inject.Inject;
import javax.validation.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Set;

/**
 *
 * 3.1 Resource Classes
 * A resource class is a Java class that uses JAX-RS annotations to implement a corresponding Web resource.
 * Resource classes are POJOs that have at least one method annotated with @Path or a request method desig- nator.
 */
@javax.ws.rs.Path("bv")
public class BvController {

    @Inject
    ResponseFactory<Participant> responseFactory;

    public BvController() {

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("participant")
    public Response validateParticipant(Participant participant) {

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Participant>> constraintViolationSet = validator.validate(participant);

        return responseFactory.buildResponse(constraintViolationSet);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJsonName() {

        return Response.ok().entity("Hello").build();
    }
}

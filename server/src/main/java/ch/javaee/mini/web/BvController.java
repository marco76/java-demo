package ch.javaee.mini.web;

import ch.javaee.demo.bv.model.Participant;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.validation.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Iterator;
import java.util.Set;

/**
 *
 * 3.1 Resource Classes
 * A resource class is a Java class that uses JAX-RS annotations to implement a corresponding Web resource.
 * Resource classes are POJOs that have at least one method annotated with @Path or a request method desig- nator.
 */
@javax.ws.rs.Path("bv")
public class BvController {

    public BvController() {

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("participant")
    public Response validateParticipant(Participant participant) {

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set<ConstraintViolation<Participant>> constraintViolationSet = validator.validate(participant);

        Iterator violationsIterator = constraintViolationSet.iterator();

        JsonArrayBuilder errorList = Json.createArrayBuilder();

        while (violationsIterator.hasNext()) {
            ConstraintViolation<Participant> violation = (ConstraintViolation<Participant>) violationsIterator.next();

            Jsonb jsonb = JsonbBuilder.create();
            String rootBean = jsonb.toJson(violation.getRootBean());

            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder()
                    .add("message", violation.getMessage())
                    .add("property path",violation.getPropertyPath().toString())
                    .add("messageTemplate", violation.getMessageTemplate())
                    .add("rootBean",  rootBean );
            if(violation.getInvalidValue()!= null) {
                jsonObjectBuilder.add("invalid value", violation.getInvalidValue().toString());

        }
            errorList.add(jsonObjectBuilder.build());
        }




        return Response.ok().entity(errorList.build()).build();

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJsonName() {

        return Response.ok().entity("Hello").build();
    }
}

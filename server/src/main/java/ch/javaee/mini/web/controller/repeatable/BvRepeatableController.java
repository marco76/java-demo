package ch.javaee.mini.web.controller.repeatable;

import ch.javaee.demo.bv.model.Participant;
import ch.javaee.demo.bv.model.repeatable.Admin;
import ch.javaee.demo.bv.model.repeatable.User;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.validation.*;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Iterator;
import java.util.Set;

@javax.ws.rs.Path("bv/repeatable")
public class BvRepeatableController {

    @Inject
    Validator validator;

    public BvRepeatableController() {

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("user")
    public Response user(@Valid SimpleUserDTO simpleUserDTO) {

        User user = new User();

        user.setPassword(simpleUserDTO.getPassword());

        Set<ConstraintViolation<User>> constraintViolationSet;
        if (simpleUserDTO.getType().equalsIgnoreCase("admin")) {
            constraintViolationSet = validator.validate(user, Admin.class);
        } else {
            constraintViolationSet = validator.validate(user);
        }

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

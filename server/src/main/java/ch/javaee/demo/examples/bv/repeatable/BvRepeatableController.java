package ch.javaee.demo.examples.bv.repeatable;

import ch.javaee.demo.common.web.json.JsonResponseFactory;

import javax.inject.Inject;
import javax.json.JsonArrayBuilder;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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

        JsonArrayBuilder errorList = new JsonResponseFactory<User>().buildJsonResponse(constraintViolationSet);

        return Response.ok().entity(errorList.build()).build();
    }
}

package ch.javaee.demo.examples.bv.emailList;

import ch.javaee.demo.common.web.json.JsonResponseFactory;

import javax.inject.Inject;
import javax.json.JsonArrayBuilder;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@javax.ws.rs.Path("bv/email")
public class BvEmailListController {

    @Inject
    Validator validator;

    public BvEmailListController() {

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("list")
    // TODO: verify the support of JAX-RS for container validation
    public Response user(List<String> emailListDTO) {

        // TODO : tried to validate directly the collection <List <@Email String>> but no constraint, added to class
        Addresses addresses = new Addresses();

        for (String email : emailListDTO) {
            addresses.addEmail(email);
        }

        Set<ConstraintViolation<Addresses>> constraintViolationSet;
            constraintViolationSet = validator.validate(addresses);

        JsonArrayBuilder errorList = new JsonResponseFactory<Addresses>().buildJsonResponse(constraintViolationSet);

        return Response.ok().entity(errorList.build()).build();
    }
}

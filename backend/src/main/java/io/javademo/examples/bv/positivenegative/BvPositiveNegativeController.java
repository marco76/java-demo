package io.javademo.examples.bv.positivenegative;

import io.javademo.common.web.response.ResponseFactory;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Set;

@javax.ws.rs.Path("bv/positive-negative")
public class BvPositiveNegativeController {

    @Inject
    Validator validator;
    @Inject
    ResponseFactory<NumbersBean> responseFactory;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("numbers-bv")
    public Response numberBeanBV(NumbersBean numbersBean) {
        Set<ConstraintViolation<NumbersBean>> constraintViolationSet = validator.validate(numbersBean);
        return responseFactory.buildResponse(constraintViolationSet);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("numbers-rs")
    public Response numberBeanJaxRS(@Valid NumbersBean numbersBean) {
        return Response.accepted().build();
    }
}

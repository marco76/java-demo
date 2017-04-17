package io.javademo.common.web.response;

import io.javademo.common.web.response.BVJsonResponseFactory;

import javax.ejb.Stateless;
import javax.json.JsonArrayBuilder;
import javax.validation.ConstraintViolation;
import javax.ws.rs.core.Response;
import java.util.Set;

/**
 * Created by marcomolteni on 16.04.17.
 */
@Stateless
public class ResponseFactory<T> {

    public Response buildResponse(Set<ConstraintViolation<T>> constraintViolationSet) {

        if (constraintViolationSet.isEmpty()) {
            return Response.ok().build();
        } else {
            JsonArrayBuilder errorList = new BVJsonResponseFactory<T>().buildJsonResponse(constraintViolationSet);
            return Response.status(Response.Status.BAD_REQUEST).entity(errorList.build()).build();
        }
    }
}

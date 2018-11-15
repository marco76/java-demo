package io.javademo.common.web.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.validation.ConstraintViolation;
import java.util.Iterator;
import java.util.Set;


/**
 * This class prepare a JSON response that contains the errors found by Bean Validation.
 *
 * Created by marco on 03.04.17.
 */

public class BVJsonResponseFactory<T> {

    public JsonArrayBuilder buildJsonResponse(Set<ConstraintViolation<T>> constraintViolationSet) {

        JsonArrayBuilder errorList = Json.createArrayBuilder();
        Iterator violationsIterator = constraintViolationSet.iterator();
        JsonObjectBuilder constraint = Json.createObjectBuilder();

        constraint.add("type", "Set&lt;ConstraintViolation&lt;T&gt;&gt;");
        int counter = 1;

        buildViolationTree(errorList, violationsIterator, constraint, counter);

        return errorList;
    }

    private void buildViolationTree(JsonArrayBuilder errorList, Iterator violationsIterator, JsonObjectBuilder constraint, int counter) {

        while (violationsIterator.hasNext()) {
            ConstraintViolation<T> violation = (ConstraintViolation) violationsIterator.next();

            String rootBean;

            try (Jsonb jsonb = JsonbBuilder.create();) {
                rootBean = jsonb.toJson(violation.getRootBean());
            } catch (Exception e) {
                rootBean = handleExceptionWithJackson(violation);
            }

            counter = prepareConstraintValidationInfo(constraint, counter, violation, rootBean);

        }
        errorList.add(constraint.build());
    }

    private int prepareConstraintValidationInfo(JsonObjectBuilder constraint, int counter, ConstraintViolation<T> violation, String rootBean) {
        JsonObjectBuilder jsonObjectBuilder = createObjectBuilder(violation, rootBean);

        if(violation.getInvalidValue()!= null) {
            jsonObjectBuilder.add("invalid value", violation.getInvalidValue().toString());

        }
        constraint.add(String.format("ConstraintViolation&lt;T&gt;[%d]",counter++), jsonObjectBuilder);

        return counter;
    }

    private String handleExceptionWithJackson(ConstraintViolation<T> violation) {
        String rootBean;// we are using a beta version of the components, in case of error we use jackson
        ObjectMapper mapper = new ObjectMapper();
        try {
            rootBean =  mapper.writeValueAsString(violation.getRootBean());
        } catch (JsonProcessingException e1) {
            rootBean = "{'error': 'Conversion error, it will work better with the final version.'}";
        }
        return rootBean;
    }

    private JsonObjectBuilder createObjectBuilder(ConstraintViolation<T> violation, String rootBean) {
        return Json.createObjectBuilder()
                .add("property path",violation.getPropertyPath().toString())
                .add("message", violation.getMessage())
                .add("messageTemplate", violation.getMessageTemplate())
                .add("rootBean",  rootBean );
    }
}

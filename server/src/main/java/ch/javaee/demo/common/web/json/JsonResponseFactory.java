package ch.javaee.demo.common.web.json;

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
 * Created by marco on 03.04.17.
 */
public class JsonResponseFactory<T> {

    public JsonArrayBuilder buildJsonResponse(Set<ConstraintViolation<T>> constraintViolationSet) {
        JsonArrayBuilder errorList = Json.createArrayBuilder();

        Iterator violationsIterator = constraintViolationSet.iterator();

        while (violationsIterator.hasNext()) {
            ConstraintViolation<T> violation = (ConstraintViolation) violationsIterator.next();

            Jsonb jsonb = JsonbBuilder.create();
            String rootBean;

            try {
                rootBean = jsonb.toJson(violation.getRootBean());
            } catch (Exception e) {
                // we are using a beta version of the components, in case of error we use jackson
                ObjectMapper mapper = new ObjectMapper();
                try {
                    rootBean =  mapper.writeValueAsString(violation.getRootBean());
                } catch (JsonProcessingException e1) {
                    rootBean = "{'error': 'Conversion error, it will work better with the final version.'}";
                }
            }

            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder()
                    .add("property path",violation.getPropertyPath().toString())
                    .add("message", violation.getMessage())
                    .add("messageTemplate", violation.getMessageTemplate())
                    .add("rootBean",  rootBean );

            if(violation.getInvalidValue()!= null) {
                jsonObjectBuilder.add("invalid value", violation.getInvalidValue().toString());

            }
            errorList.add(jsonObjectBuilder.build());
        }
        return errorList;
    }
}

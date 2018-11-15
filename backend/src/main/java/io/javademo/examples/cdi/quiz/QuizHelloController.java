package io.javademo.examples.cdi.quiz;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 20.04.17.
 */

@Path("/quiz/hello")
public class QuizHelloController {

    private static final Logger LOGGER = Logger.getLogger(QuizHelloController.class.getName());

    @Inject HelloService service;

    @GET
    public JsonObject answer() {
        LOGGER.info("quiz answer");

        JsonObjectBuilder jsonObjectBuilder =  Json.createObjectBuilder()
                .add("service.hello().getClass().getSimpleName()", service.hello().getClass().getSimpleName())
                .add("service.hello().getClass().getName()", service.hello().getClass().getName())
                .add("service.hello().toString()", service.hello().toString())
                .add("service.hello() instanceof Hello", service.hello() instanceof Hello);
        return jsonObjectBuilder.build();
    }
}

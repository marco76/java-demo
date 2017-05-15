package io.javademo.examples.real.dashboard;

import javax.json.bind.JsonbBuilder;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import java.util.Random;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 20.04.17.
 */

@Path("/dashboard")
public class DashboardController {

    private static final Logger LOGGER = Logger.getLogger(DashboardController.class.getName());

    @GET @Path("simple-chart")
    public String getSimpleData(
            @NotNull @Min(5) @Max(25)
            @QueryParam("size") Integer size,
            @NotNull @Min(5) @Max(100)
            @QueryParam("maxValue") Integer maxValue) {

        LOGGER.info(String.format("simple-chart, size: %d, maxValue: %d", size, maxValue));

        // We return an array of Int using JSON-B and the Random generator
        return JsonbBuilder.newBuilder()
                .build()
                .toJson(new Random()
                        .ints(size, 1, maxValue)
                        .toArray());
      }
}

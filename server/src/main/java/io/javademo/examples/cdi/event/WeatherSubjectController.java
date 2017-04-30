package io.javademo.examples.cdi.event;

import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 14.04.17.
 */

@javax.ws.rs.Path("/cdi/weather-event")
public class WeatherSubjectController {

    private static final Logger LOGGER = Logger.getLogger(WeatherSubjectController.class.getName());

    @Inject
    Event<WeatherEvent> weatherEvent;

    @Inject
    @WeatherType(value = "emergency")
    Event<WeatherEvent> emergencyEvent;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    // TODO JAVA EE 8: JAX-RS doesn't support yet the new annotations BV
    public Response transmitWeatherInformation(@Valid final WeatherRequestBean weatherRequestBean) {
        LOGGER.info("transmitWeatherInformation");

        WeatherEvent weatherSubject = new WeatherEvent(weatherRequestBean.getWeather());

        if (weatherRequestBean.getEmergency()) {
            emergencyEvent.fire(weatherSubject);
            emergencyEvent.fireAsync(weatherSubject);
        } else {
            weatherEvent.fire(weatherSubject);
            weatherEvent.fireAsync(weatherSubject);
        }
        if (weatherRequestBean.getWaitForEmail()) {
            waitForAsync();
        }

        return Response.ok().entity(weatherSubject).build();
    }

    private void waitForAsync() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

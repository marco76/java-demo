package io.javademo.examples.cdi.event.forecastclient;

import io.javademo.examples.cdi.event.WeatherEvent;

import javax.ejb.Stateless;
import javax.enterprise.event.Observes;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 14.04.17.
 */

@Stateless
public class WeatherWebsiteObserver {
    private final static Logger LOGGER = Logger.getLogger(WeatherWebsiteObserver.class.getName());

    public void updateWebsite(@Observes WeatherEvent weatherEvent) {
        LOGGER.log(Level.INFO, "process changeWeather");
        weatherEvent.addEvent("Our Website updated with the new forecast ("+weatherEvent.getCurrentWeather()+")");
    }
}

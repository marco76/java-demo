package io.javademo.examples.cdi.event.forecastclient;

import io.javademo.examples.cdi.event.WeatherEvent;
import io.javademo.examples.cdi.event.WeatherType;


import javax.ejb.Stateless;
import javax.enterprise.event.Observes;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 15.04.17.
 */

@Stateless
public class EmergencyObserver {
    private final static Logger LOGGER = Logger.getLogger(EmergencyObserver.class.getName());

    // TODO JavaEE8: @Priority cannot be added to a method
    public void sendAlarm(@Observes @WeatherType(value = "emergency") WeatherEvent weatherEvent) {
        LOGGER.log(Level.INFO, "process changeWeather");
        weatherEvent.addEvent("EMERGENCY communication sent!!! They will come soon!");
    }
}

package io.javademo.examples.cdi.event.forecastclient;

import io.javademo.examples.cdi.event.WeatherEvent;

import javax.ejb.Stateless;
import javax.enterprise.event.Observes;
import javax.enterprise.event.ObservesAsync;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 14.04.17.
 */

@Stateless
public class TVChannelsChangeObserver {
    private final static Logger LOGGER = Logger.getLogger(TVChannelsChangeObserver.class.getName());

    public void notifyTVChannel(@Observes WeatherEvent weatherEvent) {
        LOGGER.log(Level.INFO, "process changeWeather");
        weatherEvent.addEvent("TV Channel informed about the " + weatherEvent.getCurrentWeather());
    }

    public void sendDetailedReport(@ObservesAsync WeatherEvent weatherEvent) {
        LOGGER.log(Level.INFO, "start sendEmail");

        /**
         * Simulate a the server time needed to send the email
         */
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        weatherEvent.addEvent("ASYNCH : TV Channel, detailed email report sent");

        LOGGER.log(Level.INFO, "end sendEmail");
    }
}

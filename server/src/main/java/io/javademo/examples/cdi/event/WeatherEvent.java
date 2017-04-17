package io.javademo.examples.cdi.event;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by marcomolteni on 14.04.17.
 */
public class WeatherEvent {

    private String currentWeather;
    private Integer id = 0;
    private List<String> eventsSequence = new ArrayList<>();

    public WeatherEvent(String currentWeather) {
        this.currentWeather = currentWeather;
    }

    public void addEvent(String eventTitle){
        eventsSequence.add(++id + ":" +eventTitle);
    }

    public String getCurrentWeather() {
        return currentWeather;
    }

    public List<String> getEventsSequence() {
        return eventsSequence;
    }
}

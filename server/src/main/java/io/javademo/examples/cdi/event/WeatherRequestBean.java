package io.javademo.examples.cdi.event;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * Created by marcomolteni on 16.04.17.
 */
public class WeatherRequestBean {

    @NotEmpty
    private String weather;
    @NotNull
    private Boolean waitForAsynchEvents = Boolean.FALSE;
    @NotNull
    private Boolean isEmergency = Boolean.FALSE;

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public Boolean getWaitForAsynchEvents() {
        return waitForAsynchEvents;
    }

    public void setWaitForAsynchEvents(Boolean waitForAsynchEvents) {
        this.waitForAsynchEvents = waitForAsynchEvents;
    }

    public Boolean getEmergency() {
        return isEmergency;
    }

    public void setEmergency(Boolean emergency) {
        isEmergency = emergency;
    }
}

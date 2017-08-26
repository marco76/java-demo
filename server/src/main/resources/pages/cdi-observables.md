### Observable Event example with CDI 2.0 (Java EE 8)

Author: _Marco Molteni, @marcomolteni_

Online Demo: http://javademo.io/cdi-weather

* CDI website: http://www.cdi-spec.org/
* CDI documentation: https://docs.jboss.org/cdi/spec/2.0-PFD2/cdi-spec.html
* CDI specifications: https://www.jcp.org/en/jsr/detail?id=365
	 
With Java EE 8 CDI will receive a major upgrade. 

Between the [new major features](https://docs.jboss.org/cdi/spec/2.0-PFD2/cdi-spec.html) we can find:
* Observer ordering
* Asynchronous event

In this demo we will build a small example using these new features.
You can find the code on [GitHub](https://github.com/marco76/java-demo/tree/master/server/src/main/java/io/javademo/examples/cdi/event).

### Weather station : requirements

![alt text]([p]BACKEND_URL[/p]/images/weather.png "Example 1")


In this example we simulate a **Weather station** that has to notify multiple observer every time the weather changes.

There are 3 clients (Observers):
* The **TV channel** that want to be alerted for every change. The communication has to be done **immediately** via a predefined channel and **when possible (best effort)** a detailed report has to be sent via mail (preparing a mail requires time (blocking activity). 
* The official **weather website** has to be updated immediately, it doesn't need a detailed report (more twitter style communication).
* The **emergency services** of the government need to be alerted only in case of catastrophic events (flood etc). The communication has to be immediate.
*

### Technical implementation

#### Observers

The clients are Observers that need to be notified when an event occours.
The _TV Channel Observer _:
```java
@Stateless
public class TVChannelsChangeObserver {
	 
public void notifyTVChannel(@Observes WeatherEvent weatherEvent) {
	weatherEvent.addEvent("TV Channel informed about the " + weatherEvent.getCurrentWeather());
}
	
public void sendDetailedReport(@ObservesAsync WeatherEvent weatherEvent) {
	weatherEvent.addEvent("ASYNCH : TV Channel, detailed email report sent");
}
}
```

The class has two methods: one annotated with **@Observes** receives the synchronous WeatherEvent (notifyTVChannel), one annotated with **@ObservesAsynch** receives the async WeatherEvent.

WeatherEvent is a simple POJO that can be used to fire an Event.

```java
public class WeatherEvent {
	
	private String currentWeather;
	   
	public WeatherEvent(String currentWeather) {
	this.currentWeather = currentWeather;
	}
}
```

The Emergency Services have to be alerted only in case of 'emergency', in this case we can use a @Qualifier to filter the notification received:
```java
public void sendAlarm(@Observes @WeatherType(value = "emergency") WeatherEvent weatherEvent) {
	weatherEvent.addEvent("EMERGENCY communication sent!!! They will come soon!");
} 
```

### How to fire the events

To fire the event we need to inject the WeatherEvent 2 times in our service or controller class.
One time for the sync Event, the second time for the async Event (with the @Qualifier WeatherType).
```java
@Inject
Event<WeatherEvent> weatherEvent;
	
@Inject
@WeatherType(value = "emergency")
Event<WeatherEvent> emergencyEvent;
``` 
If we receive an emergency alert we fire the Event of type 'emergency' (emergencyEvent), otherwise we fire a simple 'weatherEvent'.

```java
WeatherEvent weatherSubject = new WeatherEvent(weatherRequestBean.getWeather());
	
if (weatherRequestBean.getEmergency()) {
	emergencyEvent.fire(weatherSubject);
	emergencyEvent.fireAsync(weatherSubject);
} else {
	weatherEvent.fire(weatherSubject);
	weatherEvent.fireAsync(weatherSubject);
}
```

The container automatically call the Observers interested:
* _emergencyEvent.fire(weatherSubject)_ : no Observer
* _emergencyEvent.fireAsync(weatherSubject)_ : EmergencyObserver, TVChannelObserver, WeatherWebsiteObserver

* _emergencyEvent.fire(weatherSubject)_ : TVChannelObserver, WeatherWebsiteObserver
* _emergencyEvent.fireAsync(weatherSubject)_ : TVChannelObserver

The advantage of this solution is that you can add new Observers (e.g. newspaper, Twitter etc.) without any change to the application logic.

### How to test it

You can go on http://javademo.io/cdi-weather and play with it :)

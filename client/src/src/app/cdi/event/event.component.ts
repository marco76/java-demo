import { Component, OnInit } from '@angular/core';
import { WeatherStatus } from './WeatherStatus';
import { PrettyJsonPipe } from "../../common/pretty-json/prettyJson.pipe";
import ResponseInfo from "../../common/technical-info/ResponseInfo";
import {RequestService} from "../../common/http/request.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [RequestService, PrettyJsonPipe]
})
export class ObserverComponent implements OnInit {

  model =  new WeatherStatus();
  responseInfo : ResponseInfo;
  code :string = "";
  request : any;

  constructor(private requestService : RequestService) { }

  ngOnInit() {

    this.code =
      ` 
    The Weather Subject notifies the Observer every time
    the weather forecast changes.
    This class has not knowledge about the classes that are observing, the container
    takes care of the communication.
    
    <pre><code class="java highlight">@Inject
Event<WeatherEvent> weatherEvent;

@Inject
@WeatherType(value = "emergency")
Event<WeatherEvent> emergencyEvent;

@POST
public Response transmitWeatherInformation(
    @Valid final WeatherRequestBean weatherRequestBean) {

    WeatherEvent weatherSubject = 
        new WeatherEvent(weatherRequestBean.getWeather());

    if (weatherRequestBean.getEmergency()) {
        emergencyEvent.fire(weatherSubject);
        emergencyEvent.fireAsync(weatherSubject);
    } else {
        weatherEvent.fire(weatherSubject);
        weatherEvent.fireAsync(weatherSubject);
    }
    return Response.ok().entity(weatherSubject).build();
}</code></pre>
The Observer is notified when the WeatherEvent fires a new Event.
    The weather information is sent directly to the TV Channel
    and a detailed report is sent by mail
    asynchronously to don't wait the mail server blocking.
    The qualifier @WeatherType(value = "") is implicit.
    
<pre><code class="java highlight">@Stateless
public class TVChannelsChangeObserver {
    public void notifyTVChannel(@Observes WeatherEvent weatherEvent) {
        weatherEvent.addEvent("TV Channel informed about the "
        + weatherEvent.getCurrentWeather());
    }

    public void sendDetailedReport(@ObservesAsync
        WeatherEvent weatherEvent) {
        weatherEvent.addEvent("ASYNC : TV Channel,
            detailed email report sent");
    }
}</code></pre>
    
The emergency observer is fired only in case the @Qualifier WeatherType
has a value "emergency"
<pre><code class="java highlight">@Stateless
public class EmergencyObserver {
    
// TODO JavaEE8: @Priority
public void sendAlarm(@Observes @WeatherType(value = "emergency")
    WeatherEvent weatherEvent) {
    weatherEvent.addEvent("EMERGENCY communication sent!!!
    They will come soon!");
}}</code></pre></div>`}

  onSubmit() {
    // trick to fire the update field event
    this.request = JSON.stringify(this.model);

     this.requestService.sendRequest('/rest/cdi/weather-event', this.model).subscribe(
       result => {this.responseInfo = result});
  }
}

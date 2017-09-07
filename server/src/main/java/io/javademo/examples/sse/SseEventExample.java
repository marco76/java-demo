package io.javademo.examples.sse;

import javax.annotation.Resource;
import javax.enterprise.concurrent.ManagedExecutorService;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.sse.OutboundSseEvent;
import javax.ws.rs.sse.Sse;
import javax.ws.rs.sse.SseEventSink;
import java.util.UUID;

@Path("/sse/simple")
public class SseEventExample {


    @Resource
    private ManagedExecutorService executorService;

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public void events(@Context SseEventSink eventSink, @Context Sse sse) throws InterruptedException {
        for (int i = 0; i < 10; i++) {
            eventSink.send(sse.newEvent("Event number "));
            Thread.sleep(1000);
        }
        eventSink.close();

    }

    @POST
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public void eventsPosted(@Context SseEventSink eventSink, @Context Sse sse) throws InterruptedException {

        // customize delay of events based on id (expecting number)
        int tmp_delay = 1000;
        final int delay = tmp_delay;

        new Thread(() -> {
            try {
                for (int i = 1; i <= 15; i++) {
                    eventSink.send(createStatsEvent(sse.newEventBuilder().comment("greenhouse"), i));
                    System.out.println("eventsink"+i);
                    Thread.sleep(delay);
                    eventSink.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    };

    private OutboundSseEvent createStatsEvent(final OutboundSseEvent.Builder builder, final int eventId) {
        return builder.id("" + eventId).data("cool")
                .mediaType(MediaType.APPLICATION_OCTET_STREAM_TYPE).build();
    }
}


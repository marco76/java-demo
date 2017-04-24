package io.javademo.examples.jpa.model;


import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.awt.*;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 23.04.17.
 */

@Path("/jpa/conference")
public class ConferenceController {

    private static final Logger LOGGER = Logger.getLogger(ConferenceController.class.getName());

    @Inject
    ConferenceService conferenceService;

    @GET @Produces(MediaType.APPLICATION_JSON)
    public List<Conference> getAllConferences(){
        LOGGER.log(Level.INFO, "getAllConferences");

        return conferenceService.getNextConferenceList();
    }
}

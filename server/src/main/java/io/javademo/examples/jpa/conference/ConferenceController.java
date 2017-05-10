package io.javademo.examples.jpa.conference;


import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
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
    @Inject
    ConferenceExcelService conferenceExcelService;

    @GET @Produces(MediaType.APPLICATION_JSON)
    public List<Conference> getConferences(){
        LOGGER.log(Level.INFO, "getConferences");

        return conferenceService.getNextConferenceList();
    }

    @GET @Path("/excel") @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAllConferencesExcel() throws IOException {
        LOGGER.info("getAllConferencesExcel");

        ByteArrayOutputStream byteArrayOutputStream = conferenceExcelService.getListAsExcel();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

        return Response.ok(byteArrayInputStream, MediaType.APPLICATION_OCTET_STREAM_TYPE).build();
    }
}

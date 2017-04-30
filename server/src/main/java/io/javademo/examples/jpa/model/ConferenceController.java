package io.javademo.examples.jpa.model;


import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
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

    public static final String EXCEL_FORMAT = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    public static final String UTF_8 = "UTF-8";
    private static final String FILENNAME_XLS = "conferences.xls";

    private static final Logger LOGGER = Logger.getLogger(ConferenceController.class.getName());

    @Inject
    ConferenceService conferenceService;
    @Inject
    ConferenceExcelService conferenceExcelService;

    @GET @Produces(MediaType.APPLICATION_JSON)
    public List<Conference> getAllConferences(){
        LOGGER.log(Level.INFO, "getAllConferences");

        return conferenceService.getNextConferenceList();
    }

    @GET @Path("/excel") @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getAllConferencesExcel(@Context HttpServletResponse response) throws IOException {
        LOGGER.info("getAllConferencesExcel");

        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename='"+FILENNAME_XLS+"'");
        response.setContentType(EXCEL_FORMAT);
        response.setCharacterEncoding(UTF_8);

        ByteArrayOutputStream byteArrayOutputStream = conferenceExcelService.getListAsExcel();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

        return Response.ok(byteArrayInputStream, MediaType.APPLICATION_OCTET_STREAM_TYPE).build();
    }
}

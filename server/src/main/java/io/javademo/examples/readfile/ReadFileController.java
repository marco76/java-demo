package io.javademo.examples.readfile;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

@javax.ws.rs.Path("read-file")
public class ReadFileController {

    private static final Logger LOGGER = Logger.getLogger(ReadFileController.class.getName());

    @Inject
    private ReadFileService readFileService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        LOGGER.log(Level.INFO, "getJson()");

        return Response.ok().entity(readFileService.getData()).build();
    }
}

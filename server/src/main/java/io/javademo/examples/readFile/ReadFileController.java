package io.javademo.examples.readFile;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

@javax.ws.rs.Path("read-file")
public class ReadFileController {

    private static final Logger LOGGER = Logger.getLogger(ReadFileController.class.getName());

    @Inject
    ReadFileService readFileService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        LOGGER.log(Level.INFO, "getJson()");

        return Response.ok().entity(readFileService.getData()).build();
    }
}

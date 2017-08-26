package io.javademo.examples.jsr;

import io.javademo.common.web.file.ReadFileService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

@javax.ws.rs.Path("read-file")
public class SimpleCacheService {

    private static final Logger LOGGER = Logger.getLogger(SimpleCacheService.class.getName());

    @Inject
    private ReadDataService readDataService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        LOGGER.log(Level.INFO, "getJson()");

        return Response.ok().entity(readDataService.getData()).build();
    }
}

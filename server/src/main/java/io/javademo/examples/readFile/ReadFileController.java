package io.javademo.examples.readFile;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@javax.ws.rs.Path("read-file")
public class ReadFileController {

    @Inject
    ReadFileService readFileService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() {
        return Response.ok().entity(readFileService.getData()).build();
    }
}

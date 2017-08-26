package io.javademo.examples.blog;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("blog")
public class BlogController {

    private static final Logger LOGGER = Logger.getLogger(BlogController.class.getName());

    @Inject
    private BuildDocumentInformationService buildDocumentInformationService;

    @GET
    @Path("/file/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDocument(@PathParam("name")String documentName) throws IOException {
        LOGGER.log(Level.INFO, String.format("getDocument(%s)", documentName));

        return Response.ok().entity(buildDocumentInformationService.getDocument(documentName)).build();
    }
}

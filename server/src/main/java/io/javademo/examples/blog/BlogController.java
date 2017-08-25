package io.javademo.examples.blog;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("blog")
public class BlogController {

    private static final Logger LOGGER = Logger.getLogger(BlogController.class.getName());
    private static final String DOCUMENT_MARKDOWN = ".md";

    @Inject
    private BuildDocumentInformationService buildDocumentInformationService;

    @GET
    @Path("/file")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDocument(String documentName) {
        LOGGER.log(Level.INFO, String.format("getDocument(%s)", documentName));

        return Response.ok().entity(buildDocumentInformationService.getDocument(documentName + DOCUMENT_MARKDOWN)).build();
    }
}

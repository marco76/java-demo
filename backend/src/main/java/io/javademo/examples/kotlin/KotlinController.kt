package io.javademo.examples.kotlin

import java.util.concurrent.atomic.AtomicLong
import java.util.logging.Level
import java.util.logging.Logger
import javax.validation.constraints.NotEmpty
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.QueryParam
import javax.ws.rs.core.MediaType

/**
 * Created by marcomolteni on 19.05.17.
 */
@Path("/kotlin")
open class GreetingController {

    companion object {
        val LOG = Logger.getLogger(GreetingController::class.java.name)
    }

    open val counter = AtomicLong()

    @GET @Path("/hello") @Produces(MediaType.APPLICATION_JSON)
    open fun greeting(@NotEmpty @QueryParam("name") name : String): Greeting {

        LOG.log(Level.INFO, "greeting %s", name);

        return Greeting(counter.incrementAndGet(), "Kotlin says: Hello, $name")
    }
}
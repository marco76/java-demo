package io.javademo.micro.api;

import org.eclipse.microprofile.config.Config;
import org.eclipse.microprofile.config.inject.ConfigProperty;


import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

// with @Path we define the url of the endpoint:
// http://javademo.io/api/example
@Path("example")
public class ExampleResource {

    // inject is required to import the property
    // to work beans.xml has to be present in webapp/WEB-INF
    @Inject
    // the property name has to match the propety in META-INF/microprofile-config.properties
    @ConfigProperty(name="firstName", defaultValue = "(Name not present)")
    private String firstName;

    @Inject
    @ConfigProperty(name="country", defaultValue = "(Country not present)")
    private String country;

    @Inject
    private Config config;

    @GET
    public String hello() {
        return String.format("First name: %s, Country: %s", firstName, country);
    }
}

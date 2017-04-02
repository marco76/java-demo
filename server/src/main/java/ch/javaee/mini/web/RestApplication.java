package ch.javaee.mini.web;

import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * 2.1 Configuration
 * The resources and providers that make up a JAX-RS application are configured via an application-supplied subclass of Application.
 */
@ApplicationPath(value = "rest")
public class RestApplication extends Application{


}

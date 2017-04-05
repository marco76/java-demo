package ch.javaee.demo.common.web;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * 2.1 Configuration
 * The resources and providers that make up a JAX-RS application are configured via an application-supplied subclass of Application.
 */
@ApplicationPath(value = "rest")
public class RestApplication extends Application{


}

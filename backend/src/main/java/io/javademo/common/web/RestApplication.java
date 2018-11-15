package io.javademo.common.web;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * 2.1 Configuration
 * The resources and providers that make up a JAX-RS application are configured via an application-supplied subclass of Application.
 */

// another used value for the path is 'io.javademo.api'
@ApplicationPath(value = "rest")
public class RestApplication extends Application{}

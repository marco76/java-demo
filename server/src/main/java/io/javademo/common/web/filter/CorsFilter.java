package io.javademo.common.web.filter;


import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.List;

/**
 *
 * This filter allows the requests from the dev client (node.js on localhost:4200)
 */

@Provider
public class CorsFilter implements ContainerResponseFilter{

    private static final String ACCESS_CONTROL_ALLOW_HEADERS = "Access-Control-Allow-Headers";
    private static final String OPTIONS = "OPTIONS";

    @Inject
    private HttpHeadersApp httpHeadersApp;

    @Override
    public void filter(ContainerRequestContext containerRequestContext, ContainerResponseContext containerResponseContext) throws IOException {

        String method = containerRequestContext.getMethod();
        MultivaluedMap<String, String> headers = containerRequestContext.getHeaders();

        headers.putAll(httpHeadersApp.getHeadersMap());
        headers.add(ACCESS_CONTROL_ALLOW_HEADERS, getRequestedHeaders(containerRequestContext));

        if(method.equals(OPTIONS)) {
            containerResponseContext.setStatus(HttpServletResponse.SC_OK);
        }
    }

    private String getRequestedHeaders(ContainerRequestContext responseContext) {
        List<String> headers = responseContext.getHeaders().get("Access-Control-Request-Headers");

        return httpHeadersApp.createHeaderList(headers);
    }
}

package io.javademo.common.web.filter;


import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 *
 * This filter allows the requests from the dev client (node.js on localhost:4200)
 */

@Provider
public class CorsFilter implements ContainerResponseFilter{

    private static final String METHODS = "GET, POST, PUT, DELETE, OPTIONS, HEAD";
    private final static int MAX_AGE = 24 * 60 * 60;
    private final static String HEADERS_ALLOWED = "accept, authorization, content-type, x-requested-with";

    @Override
    public void filter(ContainerRequestContext containerRequestContext, ContainerResponseContext containerResponseContext) throws IOException {

        String method = containerRequestContext.getMethod();
        MultivaluedMap<String, String> headers = containerRequestContext.getHeaders();
        headers.putAll(CorsFilter.getHeaders());
        headers.add("Access-Control-Allow-Headers", getRequestedHeaders(containerRequestContext));

        if(method.equals("OPTIONS")) {
            containerResponseContext.setStatus(200);
        }
    }

    public static final MultivaluedMap<String, String> getHeaders() {

        MultivaluedMap<String, String> headers = new MultivaluedHashMap<>();
        headers.add("Access-Control-Allow-Origin", "http://localhost:4200");
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Methods", METHODS);
        headers.add("Access-Control-Max-Age", String.valueOf(MAX_AGE));
        headers.add("x-responded-by", "cors-response-filter");

        return headers;
    }

    private String getRequestedHeaders(ContainerRequestContext responseContext) {
        List<String> headers = responseContext.getHeaders().get("Access-Control-Request-Headers");
        return createHeaderList(headers);
    }

    private String createHeaderList(List<String> headers) {
        if (headers == null || headers.isEmpty()) {
            return HEADERS_ALLOWED;
        }
        StringBuilder retVal = new StringBuilder();

        for (String header : headers) {
            retVal.append(header);
            retVal.append(',');
        }
        retVal.append(HEADERS_ALLOWED);
        return retVal.toString();
    }
}

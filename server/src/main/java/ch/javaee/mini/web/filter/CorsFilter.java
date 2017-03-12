package ch.javaee.mini.web.filter;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.List;

/**
 * Created by marco on 12.03.17.
 */

@Provider
public class CorsFilter implements ContainerResponseFilter{

    private static final String METHODS = "GET, POST, PUT, DELETE, OPTIONS, HEAD";
    private final static int MAX_AGE = 24 * 60 * 60;
    private final static String HEADERS_ALLOWED = "origin,accept,content-type";

    @Override
    public void filter(ContainerRequestContext containerRequestContext, ContainerResponseContext containerResponseContext) throws IOException {

        final MultivaluedMap<String, Object> headers = containerResponseContext.getHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Headers", getRequestedHeaders(containerRequestContext));
        headers.add("Access-Control-Allow-Credentials", "true");
        headers.add("Access-Control-Allow-Methods", METHODS);
        headers.add("Access-Control-Max-Age", MAX_AGE);
        headers.add("x-responded-by", "cors-response-filter");
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

package io.javademo.common.web.filter;

import javax.annotation.PostConstruct;

import javax.ejb.Singleton;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;
import java.util.List;

@Singleton
public class HttpHeadersApp {

    private static final String METHODS = "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH";
    private static final int MAX_AGE = 24 * 60 * 60;
    private static final String HTTP_LOCALHOST_NODE = "http://localhost:4200";
    private static final String ALLOW_CREDENTIALS = "true";
    private static final  String HEADERS_ALLOWED = "accept, authorization, content-type, x-requested-with";


    private MultivaluedMap<String, String> headersMap;

    @PostConstruct
    void createHeaderString() {
        headersMap = initializeHeaders();
    }

    MultivaluedMap<String, String> initializeHeaders(){
        MultivaluedMap<String, String > headers = new MultivaluedHashMap<>();

        headers.add("Access-Control-Allow-Origin", HTTP_LOCALHOST_NODE);
        headers.add("Access-Control-Allow-Credentials", ALLOW_CREDENTIALS);
        headers.add("Access-Control-Allow-Methods", METHODS);
        headers.add("Access-Control-Max-Age", String.valueOf(MAX_AGE));
        headers.add("x-responded-by", "cors-response-filter");

        return headers;
    }

    public MultivaluedMap<String, String> getHeadersMap() {
        return headersMap;
    }

    public String createHeaderList(List<String> headers) {

        if (headers == null || headers.isEmpty()) {
            return HEADERS_ALLOWED;
        }

        StringBuilder headersText = new StringBuilder();

        for (String header : headers) {
            headersText.append(header);
            headersText.append(',');
        }
        headersText.append(HEADERS_ALLOWED);

        return headersText.toString();
    }
}

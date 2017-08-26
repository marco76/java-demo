# Create Cross-Origin HTTP requests (CORS)

During the development it is a good practice to work with 2 separate application servers.

A server for your backend and a server for your frontend.

By default your Angular will use port 4200 and your Java backend the port 8080.

You will soon discover that the browsers don't like this practice and they will block the communication between frontend and backend.

For security reasons browsers don’t allow that a page answering from the domain A to load a resources from a domain B.

Using 2 different ports is like to 2 different domains from the point of view of the server.

You can read the detailed explanation of the CORS mechanism here: [Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

## How to allow CORS requests

### Angular

In our Angular requests we have to add the header:
_X-Requested-With_

This header enables a webpage to update just partially.

```typescript
this.headers = new Headers({ 'Content-Type': 'application/json' });
this.headers.append('Accept', 'application/json, text/csv');
this.headers.append('X-Requested-With', 'XMLHttpRequest');
```

### Java EE

You have to update the `ALLOWED_ORIGINS` constant with the URL of the frontend server sending the requests to the backend server.

Here is a first version, I will update with a better one:

```java
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
```
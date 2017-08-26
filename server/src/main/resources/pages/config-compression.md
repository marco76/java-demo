## Don't forget to compress your responses

### Smaller files = Better performances

The Single Page Applications based on JavaScript frameworks
tend to have a big size, they reach easily 2-3 MB for simple
applications. More libraries you use more code you are sending to
the web client.

This is not a big issue during the development but your remote
users will be impacted.

The libraries, the content and the logic of the entire
application are loaded when the user hits the first page of our
application with a negative impact on the usability and the page
ranking.


To reduce the impact of the library size there are some
optimizations that can be done during the development of the
frontend (e.g. treeshaking, module split, lazy loading etc.).


## Server compression for JavaScript applications

On the server side we can quickly improve the performaces of
the application loading time reducing the size of the data
transferred from the server to the client.

For mission critical applications with public access we should
use an external proxy with possibility of load balancig and caching
like Nginx.

For applications with a limited number of concurrent users
(most of the enterprise applications) we can simply activate the
compression features of the application server.


## WildFly configuration

WildFly has some parameters that allow the activation of the compression.

With the _standalone_ server you can modify `standalone.xml` to add the gzip filter as follow,
you should adapt the predicate according your needs:

```xml
<subsystem xmlns="urn:jboss:domain:undertow:3.1">
    ...
    <server name="default-server">
        ...
            <host name="default-host" alias="localhost">
               ...
                <filter-ref name="gzipFilter" predicate="regex[pattern='(?:application/javascript|text/css|text/html)(;.*)?', value=%{o,Content-Type}, full-match=true]"/>
              </host>
        </server>
        <servlet-container name="default">
           ...
        </servlet-container>
        <handlers>
           ...
        </handlers>
        <filters>
            ...
            <gzip name="gzipFilter"/>
        </filters>
</subsystem>
```

With this configuration the size of our JavaScript application
can be reduced by 70%.

[In my blog you can find some tests](http://javaee.ch/2017/02/20/better-performance-with-smaller-and-faster-angular-applications-using-spring-boot-and-tomcat/)
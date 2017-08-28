# Use JCache in you application

## Why use cached objects?

For most of the professional applications the use of some form of caching is required to improve the performances and to reduce the interactions with slow medias (database, disk, external services etc.)

![image???]([p]BACKEND_URL[/p]/images/cache-schema.png)

## Example of publishing our pages without cache

In this website we store the articles of the documentation in simple MarkDown files. When the user ask for a documentation page the Java backend executes the following operations:

- search the file in the Operating System
- open the file
- read the content of the file and store it in a variable
- close the file
- build a Java object with the information of the document (title, content etc.)
- send the result to the frontend using REST services

_If you open the file 10 times, this operation will be repeated 10 times._

## ... and with cache

After the configuration of the Cache the operations are the following:

- (1a) search the document in the Cache
- (2a) the document is not in the cache
  - search the file in the Operating System
  - open the file
  - read the content of the file and store it in a variable
  - close the file
  - build a Java object with the information of the document (title, content etc.)
- (3a) store the object in the cache
- (4a) send the result to the frontend using REST services

For the following requests the operations are the following:

- (1b) search the document in the Cache
- (2b) return the object to the frontend

For our application using the cache reduces the response time required to read a document from 100 milliseconds to 3-5 milliseconds, the cache is 20-30 time more fast ... with the default configuration.

## How to configure it

We decided to use the simplest possible cache configuration:  embedded mode, without optimization.

In our application we add JCache (JSR-307) and Hazelcast:

### Maven

``` xml
 <dependency>
    <groupId>javax.cache</groupId>
    <artifactId>cache-api</artifactId>
    <version>1.0.0</version>
</dependency>
 <dependency>
    <groupId>com.hazelcast</groupId>
    <artifactId>hazelcast</artifactId>
    <version>3.8.3</version>
</dependency>
```

### Java Configuration

The Cache provider is like a database and can be embedded (like a memory database, style H2) or have his own instances.
We simply add an embedded Cache. The preparation of the Cache provider requires few seconds, for this reason we start it with the boot of the application with `@Startup`

``` java
@Startup
@Singleton
public class CacheConfig {

    private CachingProvider cachingProvider;

    @PostConstruct
    public void init() {
           cachingProvider = Caching.getCachingProvider();
           CacheManager cacheManager = cachingProvider.getCacheManager();

            MutableConfiguration<String, DocumentInfoBean> configuration =
                    new MutableConfiguration<String, DocumentInfoBean>()
                            .setTypes(String.class, DocumentInfoBean.class)
                            .setStoreByValue(false);

            cacheManager.createCache("documents", configuration);

    }

    @PreDestroy
    public void close() {
        cachingProvider.close();
    }
}
```

In our example we create a new Cache that stores objects with a key of type String (the name of the document) and content the document object (DocumentInfoBean). The name of this cache is _documents_.

### Java Service

Our service receives a document name and it returns the document object as previously described.

``` java
@Stateless
public class BuildDocumentInformationService {

    private String DEFAULT_PATH = "/pages/";
    private String TYPE_MARKDOWN = ".md";

    @Inject
    private ReadFileService readFileService;

    public DocumentInfoBean getDocument(@NotNull String name) throws IOException {

        DocumentInfoBean resultDocument = null;

        try (CacheManager cacheManager = Caching.getCachingProvider().getCacheManager()) {

            Cache<String, DocumentInfoBean> cache = cacheManager.getCache("documents", String.class, DocumentInfoBean.class);

            if (cache.containsKey(name)) {
                resultDocument = cache.get(name);
            } else {
                resultDocument = new DocumentInfoBean();
                resultDocument.setContent(readFileService.getContentFromFile(DEFAULT_PATH + name + TYPE_MARKDOWN));

                cache.put(name, resultDocument);
            }
        }

        return resultDocument;
    }
}
```

## JCache missed opportunity

JCache was planned to be included in Java EE 7 and Java EE 8.

The integration with CDI would have simplyfied the use of the cache with annotations like: `@CacheResult(cacheName = "documents")`

You can find a nice example for TomEE here: [http://www.tomitribe.com/blog/2015/06/using-jcache-with-cdi/](http://www.tomitribe.com/blog/2015/06/using-jcache-with-cdi/)

Reality check: JCache is missing from Java EE. On the other hand Spring has an excellent support for Cache abstraction (and JCache): [https://docs.spring.io/spring/docs/current/spring-framework-reference/html/cache.html](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/cache.html)

Java EE has really to find an easy approach for the Cache in the future edition.
# Document the REST resources

To document the REST resources we use [Swagger](https://swagger.io/swagger-config.md)

![alt text]([p]BACKEND_URL[/p]/images/swagger_main.png)

For Spring we can automatically configure our application using [SpringFox](http://springfox.github.io/springfox/)

Here you find the detailled documentation: [https://springfox.github.io/springfox/docs/current/](https://springfox.github.io/springfox/docs/current/)

## Install SpringFox

### Maven

We need the following dependencies in our maven project:

``` xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.7.0</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.7.0</version>
</dependency>
```

springfox-swagger-ui allows us to visualize the information in an easy to use graphic interface.

If you have to manage many systems you can access the informations in JSON format and you don't require the UI library.

### Spring

In our Spring Boot application we create a Bean:

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.regex("/rest/(.*)"))
                .build();
    }
}
```

The only customization is the _.paths_, we want to expose only the resources created by us.

When you start the application Spring instantiate automatically the UI accessible here: [http://molteni.io/swagger-ui.html](http://molteni.io/swagger-ui.html)

### Example

In our application we comment a REST resource:

``` java
@ApiOperation(value = "Return the MarkDown text for a given filename",
        notes = "The text returned is in MD format.")
@RequestMapping(value = "/rest/document/{name}", method = RequestMethod.GET)
public ResponseEntity<String> getDocument(@PathVariable String name) {
     return ResponseEntity.ok(readDocumentationService.readClassPathFile(name + DOCUMENT_SUFFIX));
}
```

The Swagger UI shows us the information we added to our Java code and allow us to execute requests to our Java backend.

![alt text](http://molteni.io/images/swagger-gui.png)

The Swagger UI shows us the informations we added to our Java code and allow us to execute requests to our Java backend.


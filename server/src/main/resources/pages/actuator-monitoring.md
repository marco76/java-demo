# Actuator, easy monitoring for your application

When you have deployed many applications in your server or cloud it's not easy to monitor their individual status.

You should verify that the server, the application and the database are working correctly for each application.

Spring Boot help us to go in the direction of an automatic control of the status of the application exposing (on request) many information about it.

If you use the **@SpringBootApplication** annotation in your Application class and you add the Actuator dependency to your maven dependencies

```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
```

Spring generates for you predefined endpoints (accessible via REST) with a lot of internal information of the application: memory, beans, etc.

## Endpoints

You can find the list of the endpoints here: <http://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html>

## Create a dashboard

The type and quantity of information can be configured. This endpoints allow us to use external tools (e.g. regular ping or analysis of the JSON response) to create status dashboards and monitor if everything is working correctly or an intervention is required.

## Sensitive data

Spring cleverly hides some sensitive fields like `password` automatically and it can cache the results to reduce the impact of DDoS attacks.

You can see some examples of the result:

![alt text]([p]BACKEND_URL[/p]/images/actuator_1.png)
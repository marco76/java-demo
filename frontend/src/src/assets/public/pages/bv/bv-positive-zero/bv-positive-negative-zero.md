### @Positive, @Negative, @PositiveOrZero, @NegativeOrZero
BeanValidation 2.0 adds some new constraints for the validation of numbers.

- @Positive : the number is > than 0
- @PositiveOrZero : the number is >= 0
- @Negative : the number is < 0
- @NegativeOrZero : the number is <= 0

The supported types are
- BigDecimal, BigInteger
- byte, short, int, long, float, double and their respective wrappers

### Community involved

Particularly interesting about this new annotation is the involvement of the Java community in the definition of these constraints.
The notion of Positive and Negative number differs and in some countries (France and Belgium) 0 is Positive and Negative.

[Question](http://beanvalidation.org/news/2017/05/12/feedback-on-positive-and-negative-constraints/)

[Poll Result](http://lists.jboss.org/pipermail/beanvalidation-dev/2017-May/001346.html)

### Example

In our Java controller we built 2 methods that show how to validate the request.

In numberBeanBV we call the injected Validator to manually check if the data is valid. In case of constraint violations we build a response.

In numberBeanJaxRs we use the @Valid annotation. In case of constraint violation Jax-RS will answer directly with an Exception (HTTP 400). 
```java
@javax.ws.rs.Path("bv/positive-negative")
public class BvPositiveNegativeController {

    @Inject
    Validator validator;
    @Inject
    ResponseFactory<NumbersBean> responseFactory;

    public BvPositiveNegativeController() {}

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("numbers-bv")
    public Response numberBeanBV(NumbersBean numbersBean) {
        Set<ConstraintViolation<NumbersBean>> constraintViolationSet = validator.validate(numbersBean);
        return responseFactory.buildResponse(constraintViolationSet);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("numbers-rs")
    public Response numberBeanJaxRS(@Valid NumbersBean numbersBean) {
        return Response.accepted().build();
    }
}
```

To define the accepted values for our fields we added the constrainst to the bean class that receive the data from our REST service. 
```java
public class NumbersBean {

    @Negative
    private BigDecimal elevationOfDeathValley;
    @PositiveOrZero
    private BigDecimal numberOfBugsInYourCode;
    @NegativeOrZero
    private BigDecimal negativeNumberInFrBe;
    @Positive
    private Integer numberOfJavaDevelopers;
    
    // code ...
}
```

[Improve this text](https://github.com/marco76/java-demo/tree/master/client/src/src/assets/public/pages/bv/bv-positive-zero/bv-positive-negative-zero.md)

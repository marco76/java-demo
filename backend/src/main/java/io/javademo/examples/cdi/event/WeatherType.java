package io.javademo.examples.cdi.event;

import javax.inject.Qualifier;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

/**
 * Created by marcomolteni on 15.04.17.
 */
@Qualifier
@Retention(RetentionPolicy.RUNTIME)
@Target({TYPE, METHOD, PARAMETER, FIELD})
public @interface WeatherType {
    String value() default "";
}

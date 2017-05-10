package io.javademo.examples.cdi.quiz;

import javax.enterprise.context.Dependent;

/**
 * Created by marcomolteni on 09.05.17.
 */
@Dependent
public class Hello {

    @Override
    public String toString() {
        return "Hello";
    }
}

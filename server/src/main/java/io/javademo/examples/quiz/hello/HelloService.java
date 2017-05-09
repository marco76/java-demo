package io.javademo.examples.quiz.hello;

import javax.ejb.Stateless;
import javax.inject.Inject;

/**
 * Created by marcomolteni on 09.05.17.
 */

@Stateless
public class HelloService {

    @Inject Hello hello;
    public Hello hello() {
        return hello;
    }
}

package io.javademo.examples.bv.simple;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by marco on 29.03.17.
 */

public class Participant {

    // The name can be long only between 3 and 20 char
    @Size(min = 3, max = 20)
    private String name;

    // The email is mandatory (@NotNull)
    // Validation of the correct format of the email
    @NotNull @Email
    private CharSequence email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CharSequence getEmail() {
        return email;
    }

    public void setEmail(CharSequence email) {
        this.email = email;
    }
}

package io.javademo.examples.bv.repeatable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import javax.validation.groups.Default;

/**
 * Created by marco on 31.03.17.
 */
public class User {

    @NotEmpty @Size(min = 4, groups = Default.class)
    @NotEmpty @Size(min = 12, groups = Admin.class)
    private String password;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

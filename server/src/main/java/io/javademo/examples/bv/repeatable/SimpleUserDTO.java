package io.javademo.examples.bv.repeatable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class SimpleUserDTO {

    private String type;
    private String password;

    public SimpleUserDTO(@NotNull String type, @NotEmpty String password) {
        this.type = type;
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public String getPassword() {
        return password;
    }
}

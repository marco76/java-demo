package io.javademo.examples.bv.repeatable;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class SimpleUserDTO {

    @Getter @Setter private @NotNull String type;
    @Getter @Setter private @NotEmpty String password;

    public SimpleUserDTO() {
    }

    public SimpleUserDTO(@NotNull String type, @NotEmpty String password) {
        this.type = type;
        this.password = password;
    }
}

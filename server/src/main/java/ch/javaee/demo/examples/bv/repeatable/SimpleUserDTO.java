package ch.javaee.demo.examples.bv.repeatable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class SimpleUserDTO {

    @NotNull
    private String type;
    @NotEmpty
    private String password;

    public SimpleUserDTO() {
    }

    public SimpleUserDTO(@NotNull String type, @NotEmpty String password) {
        this.type = type;
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

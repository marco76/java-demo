package ch.javaee.demo.bv.web;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

public class SimplePatientDTO {

    @NotEmpty
    private String name;
    @NotNull
    private Integer yearOfBirth;

    // TODO : use json-b when available
    @NotNull @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}")
    private String nextAppointment;

    public SimplePatientDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYearOfBirth() {
        return yearOfBirth;
    }

    public void setYearOfBirth(Integer yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public String getNextAppointment() {
        return nextAppointment;
    }

    public void setNextAppointment(String nextAppointment) {
        this.nextAppointment = nextAppointment;
    }
}

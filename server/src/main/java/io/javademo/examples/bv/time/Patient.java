package io.javademo.examples.bv.time;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.Year;

/**
 * Created by marco on 03.04.17.
 */
public class Patient {

    @NotNull @NotEmpty @Size(min = 3, max = 50)
    private String name;

    @Past @JsonDeserialize(using = YearDeserializer.class) @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Year yearOfBirth;

    @NotNull @FutureOrPresent
    @JsonDeserialize(using = JsDateDeserializer.class)
    private LocalDate nextAppointment;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Year getYearOfBirth() {
        return yearOfBirth;
    }

    public void setYearOfBirth(Year yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public LocalDate getNextAppointment() {
        return nextAppointment;
    }

    public void setNextAppointment(LocalDate nextAppointment) {
        this.nextAppointment = nextAppointment;
    }
}

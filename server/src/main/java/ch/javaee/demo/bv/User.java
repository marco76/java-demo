package ch.javaee.demo.bv;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class User {

    @Size(min = 5, max = 16)
    private String username;

    @Size(min = 5, max = 50)
    private String name;

    @Min(value = 1800)
    private Integer yearOfBirth;


    public User(String username, String name, Integer yearOfBirth) {
        this.username = username;
        this.name = name;
        this.yearOfBirth = yearOfBirth;
    }

    private LocalDate firstDayOfWork;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public LocalDate getFirstDayOfWork() {
        return firstDayOfWork;
    }

    public void setFirstDayOfWork(LocalDate firstDayOfWork) {
        this.firstDayOfWork = firstDayOfWork;
    }
}

package io.javademo.examples.bv.time;

import io.javademo.common.web.response.ResponseFactory;

import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Set;

@javax.ws.rs.Path("bv/time")
public class BvTimeController {

    @Inject
    Validator validator;
    @Inject
    ResponseFactory<Patient> responseFactory;

    public BvTimeController() {

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @javax.ws.rs.Path("patient")
    public Response user(@Valid SimplePatientDTO simplePatientDTO) {

        Patient patient = new Patient();
        patient.setName(simplePatientDTO.getName());

        patient.setNextAppointment(convertDate(simplePatientDTO.getNextAppointment()));
        patient.setYearOfBirth(Year.of(simplePatientDTO.getYearOfBirth()));

        Set<ConstraintViolation<Patient>> constraintViolationSet;
        constraintViolationSet = validator.validate(patient);

        return responseFactory.buildResponse(constraintViolationSet);
    }

    private LocalDate convertDate(String dateAsString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formatter = formatter.withLocale( Locale.US );
        LocalDate date = LocalDate.parse(dateAsString, formatter);
        return date;
    }
}

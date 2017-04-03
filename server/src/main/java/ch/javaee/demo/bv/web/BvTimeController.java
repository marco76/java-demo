package ch.javaee.demo.bv.web;

import ch.javaee.demo.bv.model.time.Patient;
import ch.javaee.demo.web.JsonResponseFactory;

import javax.inject.Inject;
import javax.json.JsonArrayBuilder;
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

        JsonArrayBuilder errorList = new JsonResponseFactory<Patient>().buildJsonResponse(constraintViolationSet);

        return Response.ok().entity(errorList.build()).build();

    }

    private LocalDate convertDate(String dateAsString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        formatter = formatter.withLocale( Locale.US );
        LocalDate date = LocalDate.parse(dateAsString, formatter);
        return date;
    }
}

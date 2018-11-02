package io.springdemo.conference.conference;


import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by marcomolteni on 23.04.17.
 */

@RestController()
@CrossOrigin()
public class ConferenceController {

    private static final Logger LOGGER = Logger.getLogger(ConferenceController.class.getName());


    private ConferenceService conferenceService;
    private ConferenceExcelService conferenceExcelService;

    public ConferenceController(ConferenceService conferenceService,
                                ConferenceExcelService conferenceExcelService) {
        this.conferenceService = conferenceService;
        this.conferenceExcelService = conferenceExcelService;
    }

    @RequestMapping("/rest/conference")
    @ApiOperation(value = "Return next conferences")

    public List<Conference> getConferences(){
        LOGGER.log(Level.INFO, "getConferences");

        return conferenceService.getNextConferenceList();
    }

    @ApiOperation(value = "Return the excel list of the next conferences")
    @RequestMapping(value = "/rest/conference/excel",
            produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity getAllConferencesExcel() throws IOException {
        LOGGER.info("getAllConferencesExcel");

        ByteArrayOutputStream byteArrayOutputStream = conferenceExcelService.getListAsExcel();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

        return ResponseEntity.ok(byteArrayInputStream);
    }
}
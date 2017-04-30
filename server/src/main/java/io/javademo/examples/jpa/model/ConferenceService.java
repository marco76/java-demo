package io.javademo.examples.jpa.model;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.ZoneId;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;

/**
 * Created by marcomolteni on 23.04.17.
 */
@Stateless
public class ConferenceService {

    @Inject
    ConferenceRepository conferenceRepository;

    public List<Conference> getNextConferenceList () {
        return conferenceRepository.getNextConferenceList();
    }

    public Conference save(Conference conference) {
        return conferenceRepository.save(conference);
    }
}

package io.javademo.examples.jpa.conference;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.time.LocalDate;
import java.util.List;

/**
 * Created by marcomolteni on 23.04.17.
 */
@Stateless
public class ConferenceService {

    private final Integer CONFERENCES_TO_SHOW = 10;

    @Inject
    ConferenceRepository conferenceRepository;

    public List<Conference> getNextConferenceList () {
        return conferenceRepository.getNextActiveConferenceList(CONFERENCES_TO_SHOW, LocalDate.now());
    }

    public Conference save(Conference conference) {
        return conferenceRepository.save(conference);
    }
}

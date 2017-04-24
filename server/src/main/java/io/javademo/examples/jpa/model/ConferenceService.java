package io.javademo.examples.jpa.model;

import javax.ejb.Stateless;
import javax.inject.Inject;
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

package io.springdemo.conference.conference;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Created by marcomolteni on 23.04.17.
 */
@Service
public class ConferenceService {

    private final Integer CONFERENCES_TO_SHOW = 15;

    private ConferenceRepository conferenceRepository;

    public ConferenceService(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }


    public List<Conference> getNextConferenceList () {
        //return conferenceRepository.getNextActiveConferenceList(CONFERENCES_TO_SHOW, LocalDate.now());
        return conferenceRepository.findByEndGreaterThanOrderByEndAsc(LocalDate.now());
    }

    public Conference save(Conference conference) {
        return conferenceRepository.save(conference);
    }
}

package io.springdemo.conference.conference;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

/**
 * Created by marcomolteni on 23.04.17.
 */

public interface ConferenceRepository extends JpaRepository<Conference, Long> {
    List<Conference> findByEndGreaterThanOrderByEndAsc(LocalDate today);
}

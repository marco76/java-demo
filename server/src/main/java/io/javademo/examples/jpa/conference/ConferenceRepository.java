package io.javademo.examples.jpa.conference;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

/**
 * Created by marcomolteni on 23.04.17.
 */

@Stateless
public class ConferenceRepository {

    @PersistenceContext
    private EntityManager entityManager;


    public List<Conference> getAllConferences() {

        TypedQuery<Conference> query = entityManager.createQuery("SELECT c FROM Conference c ORDER BY c.begin ASC", Conference.class);

        return query.getResultList();
    }

    public List<Conference> getNextActiveConferenceList(Integer maxResults, LocalDate endAfterOr ) {

        TypedQuery<Conference> query = entityManager
                .createQuery("SELECT c FROM Conference c WHERE c.end >= :endAfterOr ORDER BY c.begin ASC",
                        Conference.class)
                .setMaxResults(maxResults);
        query.setParameter("endAfterOr", endAfterOr);

        return query.getResultList();
    }

    public Conference save(Conference conference) {
        entityManager.persist(conference);

        return conference;
    }
}

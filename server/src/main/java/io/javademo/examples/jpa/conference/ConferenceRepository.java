package io.javademo.examples.jpa.conference;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Created by marcomolteni on 23.04.17.
 */

@Stateless
public class ConferenceRepository {

    @PersistenceContext
    private EntityManager entityManager;


    public List<Conference> getNextConferenceList() {
        TypedQuery<Conference> query = entityManager.createQuery("SELECT c FROM Conference c ORDER BY c.begin ASC", Conference.class).setMaxResults(10);
        return query.getResultList();
    }

    public Conference save(Conference conference) {
        entityManager.persist(conference);

        return conference;
    }
}

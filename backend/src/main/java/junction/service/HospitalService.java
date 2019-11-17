package junction.service;

import junction.domain.Hospital;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Hospital}.
 */
public interface HospitalService {

    /**
     * Save a hospital.
     *
     * @param hospital the entity to save.
     * @return the persisted entity.
     */
    Hospital save(Hospital hospital);

    /**
     * Get all the hospitals.
     *
     * @return the list of entities.
     */
    List<Hospital> findAll();


    /**
     * Get the "id" hospital.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Hospital> findOne(Long id);

    /**
     * Delete the "id" hospital.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

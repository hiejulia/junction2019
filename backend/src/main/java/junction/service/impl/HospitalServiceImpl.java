package junction.service.impl;

import junction.service.HospitalService;
import junction.domain.Hospital;
import junction.repository.HospitalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Hospital}.
 */
@Service
@Transactional
public class HospitalServiceImpl implements HospitalService {

    private final Logger log = LoggerFactory.getLogger(HospitalServiceImpl.class);

    private final HospitalRepository hospitalRepository;

    public HospitalServiceImpl(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    /**
     * Save a hospital.
     *
     * @param hospital the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Hospital save(Hospital hospital) {
        log.debug("Request to save Hospital : {}", hospital);
        return hospitalRepository.save(hospital);
    }

    /**
     * Get all the hospitals.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Hospital> findAll() {
        log.debug("Request to get all Hospitals");
        return hospitalRepository.findAll();
    }


    /**
     * Get one hospital by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Hospital> findOne(Long id) {
        log.debug("Request to get Hospital : {}", id);
        return hospitalRepository.findById(id);
    }

    /**
     * Delete the hospital by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Hospital : {}", id);
        hospitalRepository.deleteById(id);
    }
}

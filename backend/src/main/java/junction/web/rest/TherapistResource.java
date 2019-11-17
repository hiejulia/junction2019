package junction.web.rest;

import junction.domain.Therapist;
import junction.repository.TherapistRepository;
import junction.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link junction.domain.Therapist}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TherapistResource {

    private final Logger log = LoggerFactory.getLogger(TherapistResource.class);

    private final TherapistRepository therapistRepository;

    public TherapistResource(TherapistRepository therapistRepository) {
        this.therapistRepository = therapistRepository;
    }

    /**
     * {@code GET  /therapists} : get all the therapists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of therapists in body.
     */
    @GetMapping("/therapists")
    public List<Therapist> getAllTherapists() {
        log.debug("REST request to get all Therapists");
        return therapistRepository.findAll();
    }

    /**
     * {@code GET  /therapists/:id} : get the "id" therapist.
     *
     * @param id the id of the therapist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the therapist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/therapists/{id}")
    public ResponseEntity<Therapist> getTherapist(@PathVariable Long id) {
        log.debug("REST request to get Therapist : {}", id);
        Optional<Therapist> therapist = therapistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(therapist);
    }
}

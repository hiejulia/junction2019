package junction.web.rest;

import junction.domain.FaceImage;
import junction.repository.FaceImageRepository;
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
 * REST controller for managing {@link junction.domain.FaceImage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FaceImageResource {

    private final Logger log = LoggerFactory.getLogger(FaceImageResource.class);

    private static final String ENTITY_NAME = "faceImage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FaceImageRepository faceImageRepository;

    public FaceImageResource(FaceImageRepository faceImageRepository) {
        this.faceImageRepository = faceImageRepository;
    }

    /**
     * {@code POST  /face-images} : Create a new faceImage.
     *
     * @param faceImage the faceImage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new faceImage, or with status {@code 400 (Bad Request)} if the faceImage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/face-images")
    public ResponseEntity<FaceImage> createFaceImage(@RequestBody FaceImage faceImage) throws URISyntaxException {
        log.debug("REST request to save FaceImage : {}", faceImage);
        if (faceImage.getId() != null) {
            throw new BadRequestAlertException("A new faceImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FaceImage result = faceImageRepository.save(faceImage);
        return ResponseEntity.created(new URI("/api/face-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /face-images} : Updates an existing faceImage.
     *
     * @param faceImage the faceImage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated faceImage,
     * or with status {@code 400 (Bad Request)} if the faceImage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the faceImage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/face-images")
    public ResponseEntity<FaceImage> updateFaceImage(@RequestBody FaceImage faceImage) throws URISyntaxException {
        log.debug("REST request to update FaceImage : {}", faceImage);
        if (faceImage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FaceImage result = faceImageRepository.save(faceImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, faceImage.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /face-images} : get all the faceImages.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of faceImages in body.
     */
    @GetMapping("/face-images")
    public List<FaceImage> getAllFaceImages() {
        log.debug("REST request to get all FaceImages");
        return faceImageRepository.findAll();
    }

    /**
     * {@code GET  /face-images/:id} : get the "id" faceImage.
     *
     * @param id the id of the faceImage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the faceImage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/face-images/{id}")
    public ResponseEntity<FaceImage> getFaceImage(@PathVariable Long id) {
        log.debug("REST request to get FaceImage : {}", id);
        Optional<FaceImage> faceImage = faceImageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(faceImage);
    }

    /**
     * {@code DELETE  /face-images/:id} : delete the "id" faceImage.
     *
     * @param id the id of the faceImage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/face-images/{id}")
    public ResponseEntity<Void> deleteFaceImage(@PathVariable Long id) {
        log.debug("REST request to delete FaceImage : {}", id);
        faceImageRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}

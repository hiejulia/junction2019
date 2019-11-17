package junction.web.rest;

import junction.domain.Diary;
import junction.repository.DiaryRepository;
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
 * REST controller for managing {@link junction.domain.Diary}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiaryResource {

    private final Logger log = LoggerFactory.getLogger(DiaryResource.class);

    private static final String ENTITY_NAME = "diary";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiaryRepository diaryRepository;

    public DiaryResource(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    /**
     * {@code POST  /diaries} : Create a new diary.
     *
     * @param diary the diary to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diary, or with status {@code 400 (Bad Request)} if the diary has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diaries")
    public ResponseEntity<Diary> createDiary(@RequestBody Diary diary) throws URISyntaxException {
        if (diary.getId() != null) {
            throw new BadRequestAlertException("A new diary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Diary result = diaryRepository.save(diary);
        return ResponseEntity.created(new URI("/api/diaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diaries} : Updates an existing diary.
     *
     * @param diary the diary to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diary,
     * or with status {@code 400 (Bad Request)} if the diary is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diary couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diaries")
    public ResponseEntity<Diary> updateDiary(@RequestBody Diary diary) throws URISyntaxException {
        log.debug("REST request to update Diary : {}", diary);
        if (diary.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Diary result = diaryRepository.save(diary);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diary.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diaries} : get all the diaries.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diaries in body.
     */
    @GetMapping("/diaries")
    public List<Diary> getAllDiaries() {
        log.debug("REST request to get all Diaries");
        return diaryRepository.findAll();
    }



    @GetMapping("/users/{userId}/diaries")
    public List<Diary> getAllDiaries(@PathVariable(value = "userId") Long userId) {
        return diaryRepository.getByUserId(userId);
    }

    /**
     * {@code GET  /diaries/:id} : get the "id" diary.
     *
     * @param id the id of the diary to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diary, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diaries/{id}")
    public ResponseEntity<Diary> getDiary(@PathVariable Long id) {
        log.debug("REST request to get Diary : {}", id);
        Optional<Diary> diary = diaryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diary);
    }

    /**
     * {@code DELETE  /diaries/:id} : delete the "id" diary.
     *
     * @param id the id of the diary to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diaries/{id}")
    public ResponseEntity<Void> deleteDiary(@PathVariable Long id) {
        log.debug("REST request to delete Diary : {}", id);
        diaryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}

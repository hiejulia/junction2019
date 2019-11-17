package junction.web.rest;

import junction.RedisTestContainerExtension;
import junction.JunctionApp;
import junction.domain.FaceImage;
import junction.repository.FaceImageRepository;
import junction.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static junction.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FaceImageResource} REST controller.
 */
@SpringBootTest(classes = JunctionApp.class)
@ExtendWith(RedisTestContainerExtension.class)
public class FaceImageResourceIT {

    private static final String DEFAULT_EMOTIONS = "AAAAAAAAAA";
    private static final String UPDATED_EMOTIONS = "BBBBBBBBBB";

    @Autowired
    private FaceImageRepository faceImageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFaceImageMockMvc;

    private FaceImage faceImage;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FaceImageResource faceImageResource = new FaceImageResource(faceImageRepository);
        this.restFaceImageMockMvc = MockMvcBuilders.standaloneSetup(faceImageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FaceImage createEntity(EntityManager em) {
        FaceImage faceImage = new FaceImage()
            .emotions(DEFAULT_EMOTIONS);
        return faceImage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FaceImage createUpdatedEntity(EntityManager em) {
        FaceImage faceImage = new FaceImage()
            .emotions(UPDATED_EMOTIONS);
        return faceImage;
    }

    @BeforeEach
    public void initTest() {
        faceImage = createEntity(em);
    }

    @Test
    @Transactional
    public void createFaceImage() throws Exception {
        int databaseSizeBeforeCreate = faceImageRepository.findAll().size();

        // Create the FaceImage
        restFaceImageMockMvc.perform(post("/api/face-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceImage)))
            .andExpect(status().isCreated());

        // Validate the FaceImage in the database
        List<FaceImage> faceImageList = faceImageRepository.findAll();
        assertThat(faceImageList).hasSize(databaseSizeBeforeCreate + 1);
        FaceImage testFaceImage = faceImageList.get(faceImageList.size() - 1);
        assertThat(testFaceImage.getEmotions()).isEqualTo(DEFAULT_EMOTIONS);
    }

    @Test
    @Transactional
    public void createFaceImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = faceImageRepository.findAll().size();

        // Create the FaceImage with an existing ID
        faceImage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFaceImageMockMvc.perform(post("/api/face-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceImage)))
            .andExpect(status().isBadRequest());

        // Validate the FaceImage in the database
        List<FaceImage> faceImageList = faceImageRepository.findAll();
        assertThat(faceImageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFaceImages() throws Exception {
        // Initialize the database
        faceImageRepository.saveAndFlush(faceImage);

        // Get all the faceImageList
        restFaceImageMockMvc.perform(get("/api/face-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(faceImage.getId().intValue())))
            .andExpect(jsonPath("$.[*].emotions").value(hasItem(DEFAULT_EMOTIONS)));
    }
    
    @Test
    @Transactional
    public void getFaceImage() throws Exception {
        // Initialize the database
        faceImageRepository.saveAndFlush(faceImage);

        // Get the faceImage
        restFaceImageMockMvc.perform(get("/api/face-images/{id}", faceImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(faceImage.getId().intValue()))
            .andExpect(jsonPath("$.emotions").value(DEFAULT_EMOTIONS));
    }

    @Test
    @Transactional
    public void getNonExistingFaceImage() throws Exception {
        // Get the faceImage
        restFaceImageMockMvc.perform(get("/api/face-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFaceImage() throws Exception {
        // Initialize the database
        faceImageRepository.saveAndFlush(faceImage);

        int databaseSizeBeforeUpdate = faceImageRepository.findAll().size();

        // Update the faceImage
        FaceImage updatedFaceImage = faceImageRepository.findById(faceImage.getId()).get();
        // Disconnect from session so that the updates on updatedFaceImage are not directly saved in db
        em.detach(updatedFaceImage);
        updatedFaceImage
            .emotions(UPDATED_EMOTIONS);

        restFaceImageMockMvc.perform(put("/api/face-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFaceImage)))
            .andExpect(status().isOk());

        // Validate the FaceImage in the database
        List<FaceImage> faceImageList = faceImageRepository.findAll();
        assertThat(faceImageList).hasSize(databaseSizeBeforeUpdate);
        FaceImage testFaceImage = faceImageList.get(faceImageList.size() - 1);
        assertThat(testFaceImage.getEmotions()).isEqualTo(UPDATED_EMOTIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingFaceImage() throws Exception {
        int databaseSizeBeforeUpdate = faceImageRepository.findAll().size();

        // Create the FaceImage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFaceImageMockMvc.perform(put("/api/face-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(faceImage)))
            .andExpect(status().isBadRequest());

        // Validate the FaceImage in the database
        List<FaceImage> faceImageList = faceImageRepository.findAll();
        assertThat(faceImageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFaceImage() throws Exception {
        // Initialize the database
        faceImageRepository.saveAndFlush(faceImage);

        int databaseSizeBeforeDelete = faceImageRepository.findAll().size();

        // Delete the faceImage
        restFaceImageMockMvc.perform(delete("/api/face-images/{id}", faceImage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FaceImage> faceImageList = faceImageRepository.findAll();
        assertThat(faceImageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

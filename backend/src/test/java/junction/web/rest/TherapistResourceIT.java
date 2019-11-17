package junction.web.rest;

import junction.RedisTestContainerExtension;
import junction.JunctionApp;
import junction.domain.Therapist;
import junction.repository.TherapistRepository;
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
 * Integration tests for the {@link TherapistResource} REST controller.
 */
@SpringBootTest(classes = JunctionApp.class)
@ExtendWith(RedisTestContainerExtension.class)
public class TherapistResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EXPERTISE = "AAAAAAAAAA";
    private static final String UPDATED_EXPERTISE = "BBBBBBBBBB";

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    @Autowired
    private TherapistRepository therapistRepository;

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

    private MockMvc restTherapistMockMvc;

    private Therapist therapist;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TherapistResource therapistResource = new TherapistResource(therapistRepository);
        this.restTherapistMockMvc = MockMvcBuilders.standaloneSetup(therapistResource)
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
    public static Therapist createEntity(EntityManager em) {
        Therapist therapist = new Therapist()
            .name(DEFAULT_NAME)
            .expertise(DEFAULT_EXPERTISE)
            .userId(DEFAULT_USER_ID);
        return therapist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Therapist createUpdatedEntity(EntityManager em) {
        Therapist therapist = new Therapist()
            .name(UPDATED_NAME)
            .expertise(UPDATED_EXPERTISE)
            .userId(UPDATED_USER_ID);
        return therapist;
    }

    @BeforeEach
    public void initTest() {
        therapist = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllTherapists() throws Exception {
        // Initialize the database
        therapistRepository.saveAndFlush(therapist);

        // Get all the therapistList
        restTherapistMockMvc.perform(get("/api/therapists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(therapist.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].expertise").value(hasItem(DEFAULT_EXPERTISE)))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getTherapist() throws Exception {
        // Initialize the database
        therapistRepository.saveAndFlush(therapist);

        // Get the therapist
        restTherapistMockMvc.perform(get("/api/therapists/{id}", therapist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(therapist.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.expertise").value(DEFAULT_EXPERTISE))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTherapist() throws Exception {
        // Get the therapist
        restTherapistMockMvc.perform(get("/api/therapists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }
}

package junction.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import junction.web.rest.TestUtil;

public class DiaryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diary.class);
        Diary diary1 = new Diary();
        diary1.setId(1L);
        Diary diary2 = new Diary();
        diary2.setId(diary1.getId());
        assertThat(diary1).isEqualTo(diary2);
        diary2.setId(2L);
        assertThat(diary1).isNotEqualTo(diary2);
        diary1.setId(null);
        assertThat(diary1).isNotEqualTo(diary2);
    }
}

package junction.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import junction.web.rest.TestUtil;

public class FaceImageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FaceImage.class);
        FaceImage faceImage1 = new FaceImage();
        faceImage1.setId(1L);
        FaceImage faceImage2 = new FaceImage();
        faceImage2.setId(faceImage1.getId());
        assertThat(faceImage1).isEqualTo(faceImage2);
        faceImage2.setId(2L);
        assertThat(faceImage1).isNotEqualTo(faceImage2);
        faceImage1.setId(null);
        assertThat(faceImage1).isNotEqualTo(faceImage2);
    }
}

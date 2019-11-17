package junction.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A FaceImage.
 */
@Entity
@Table(name = "face_image")
public class FaceImage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "emotions")
    private String emotions;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmotions() {
        return emotions;
    }

    public FaceImage emotions(String emotions) {
        this.emotions = emotions;
        return this;
    }

    public void setEmotions(String emotions) {
        this.emotions = emotions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FaceImage)) {
            return false;
        }
        return id != null && id.equals(((FaceImage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FaceImage{" +
            "id=" + getId() +
            ", emotions='" + getEmotions() + "'" +
            "}";
    }
}

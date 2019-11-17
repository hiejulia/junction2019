package junction.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Therapist.
 */
@Entity
@Table(name = "therapist")
public class Therapist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "expertise")
    private String expertise;

    @Column(name = "user_id")
    private Long userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Therapist name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExpertise() {
        return expertise;
    }

    public Therapist expertise(String expertise) {
        this.expertise = expertise;
        return this;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public Long getUserId() {
        return userId;
    }

    public Therapist userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Therapist)) {
            return false;
        }
        return id != null && id.equals(((Therapist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Therapist{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", expertise='" + getExpertise() + "'" +
            ", userId=" + getUserId() +
            "}";
    }
}

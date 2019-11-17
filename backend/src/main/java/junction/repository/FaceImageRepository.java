package junction.repository;
import junction.domain.FaceImage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FaceImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaceImageRepository extends JpaRepository<FaceImage, Long> {

}

package junction.repository;
import junction.domain.Diary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Diary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    List<Diary> getByUserId(Long id);

}

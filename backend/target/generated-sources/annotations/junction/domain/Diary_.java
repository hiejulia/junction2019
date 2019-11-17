package junction.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Diary.class)
public abstract class Diary_ {

	public static volatile SingularAttribute<Diary, LocalDate> createdAt;
	public static volatile SingularAttribute<Diary, Long> id;
	public static volatile SingularAttribute<Diary, Long> userId;
	public static volatile SingularAttribute<Diary, String> content;
	public static volatile SingularAttribute<Diary, String> n;

	public static final String CREATED_AT = "createdAt";
	public static final String ID = "id";
	public static final String USER_ID = "userId";
	public static final String CONTENT = "content";
	public static final String N = "n";

}


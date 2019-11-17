package junction.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Therapist.class)
public abstract class Therapist_ {

	public static volatile SingularAttribute<Therapist, String> name;
	public static volatile SingularAttribute<Therapist, Long> id;
	public static volatile SingularAttribute<Therapist, String> expertise;
	public static volatile SingularAttribute<Therapist, Long> userId;

	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String EXPERTISE = "expertise";
	public static final String USER_ID = "userId";

}


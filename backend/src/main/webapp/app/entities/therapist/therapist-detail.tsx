import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './therapist.reducer';
import { ITherapist } from 'app/shared/model/therapist.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITherapistDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TherapistDetail extends React.Component<ITherapistDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { therapistEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Therapist [<b>{therapistEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{therapistEntity.name}</dd>
            <dt>
              <span id="expertise">Expertise</span>
            </dt>
            <dd>{therapistEntity.expertise}</dd>
            <dt>
              <span id="userId">User Id</span>
            </dt>
            <dd>{therapistEntity.userId}</dd>
          </dl>
          <Button tag={Link} to="/therapist" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ therapist }: IRootState) => ({
  therapistEntity: therapist.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TherapistDetail);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hospital.reducer';
import { IHospital } from 'app/shared/model/hospital.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHospitalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HospitalDetail extends React.Component<IHospitalDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hospitalEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Hospital [<b>{hospitalEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{hospitalEntity.name}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{hospitalEntity.city}</dd>
          </dl>
          <Button tag={Link} to="/hospital" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/hospital/${hospitalEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ hospital }: IRootState) => ({
  hospitalEntity: hospital.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HospitalDetail);

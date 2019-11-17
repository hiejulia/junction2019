import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './face-image.reducer';
import { IFaceImage } from 'app/shared/model/face-image.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFaceImageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FaceImageDetail extends React.Component<IFaceImageDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { faceImageEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            FaceImage [<b>{faceImageEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="emotions">Emotions</span>
            </dt>
            <dd>{faceImageEntity.emotions}</dd>
          </dl>
          <Button tag={Link} to="/face-image" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/face-image/${faceImageEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ faceImage }: IRootState) => ({
  faceImageEntity: faceImage.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaceImageDetail);

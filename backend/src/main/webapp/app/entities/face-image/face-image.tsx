import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './face-image.reducer';
import { IFaceImage } from 'app/shared/model/face-image.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFaceImageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FaceImage extends React.Component<IFaceImageProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { faceImageList, match } = this.props;
    return (
      <div>
        <h2 id="face-image-heading">
          Face Images
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Face Image
          </Link>
        </h2>
        <div className="table-responsive">
          {faceImageList && faceImageList.length > 0 ? (
            <Table responsive aria-describedby="face-image-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Emotions</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {faceImageList.map((faceImage, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${faceImage.id}`} color="link" size="sm">
                        {faceImage.id}
                      </Button>
                    </td>
                    <td>{faceImage.emotions}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${faceImage.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${faceImage.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${faceImage.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Face Images found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ faceImage }: IRootState) => ({
  faceImageList: faceImage.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaceImage);

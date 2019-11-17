import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './therapist.reducer';
import { ITherapist } from 'app/shared/model/therapist.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITherapistProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Therapist extends React.Component<ITherapistProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { therapistList, match } = this.props;
    return (
      <div>
        <h2 id="therapist-heading">Therapists</h2>
        <div className="table-responsive">
          {therapistList && therapistList.length > 0 ? (
            <Table responsive aria-describedby="therapist-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Expertise</th>
                  <th>User Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {therapistList.map((therapist, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${therapist.id}`} color="link" size="sm">
                        {therapist.id}
                      </Button>
                    </td>
                    <td>{therapist.name}</td>
                    <td>{therapist.expertise}</td>
                    <td>{therapist.userId}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${therapist.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Therapists found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ therapist }: IRootState) => ({
  therapistList: therapist.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Therapist);

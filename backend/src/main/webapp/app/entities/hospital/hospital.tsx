import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './hospital.reducer';
import { IHospital } from 'app/shared/model/hospital.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHospitalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Hospital extends React.Component<IHospitalProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { hospitalList, match } = this.props;
    return (
      <div>
        <h2 id="hospital-heading">
          Hospitals
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Hospital
          </Link>
        </h2>
        <div className="table-responsive">
          {hospitalList && hospitalList.length > 0 ? (
            <Table responsive aria-describedby="hospital-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>City</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {hospitalList.map((hospital, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${hospital.id}`} color="link" size="sm">
                        {hospital.id}
                      </Button>
                    </td>
                    <td>{hospital.name}</td>
                    <td>{hospital.city}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${hospital.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${hospital.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${hospital.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Hospitals found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ hospital }: IRootState) => ({
  hospitalList: hospital.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hospital);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './diary.reducer';
import { IDiary } from 'app/shared/model/diary.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiaryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Diary extends React.Component<IDiaryProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { diaryList, match } = this.props;
    return (
      <div>
        <h2 id="diary-heading">
          Diaries
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Diary
          </Link>
        </h2>
        <div className="table-responsive">
          {diaryList && diaryList.length > 0 ? (
            <Table responsive aria-describedby="diary-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Content</th>
                  <th>Created At</th>
                  <th>User Id</th>
                  <th>N</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {diaryList.map((diary, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${diary.id}`} color="link" size="sm">
                        {diary.id}
                      </Button>
                    </td>
                    <td>{diary.content}</td>
                    <td>
                      <TextFormat type="date" value={diary.createdAt} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{diary.userId}</td>
                    <td>{diary.n}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${diary.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${diary.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${diary.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Diaries found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ diary }: IRootState) => ({
  diaryList: diary.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary);

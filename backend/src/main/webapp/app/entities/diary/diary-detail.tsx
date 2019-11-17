import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './diary.reducer';
import { IDiary } from 'app/shared/model/diary.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiaryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DiaryDetail extends React.Component<IDiaryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { diaryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Diary [<b>{diaryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">Content</span>
            </dt>
            <dd>{diaryEntity.content}</dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={diaryEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="userId">User Id</span>
            </dt>
            <dd>{diaryEntity.userId}</dd>
            <dt>
              <span id="n">N</span>
            </dt>
            <dd>{diaryEntity.n}</dd>
          </dl>
          <Button tag={Link} to="/diary" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/diary/${diaryEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ diary }: IRootState) => ({
  diaryEntity: diary.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiaryDetail);

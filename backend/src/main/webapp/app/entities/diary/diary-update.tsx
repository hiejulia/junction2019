import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './diary.reducer';
import { IDiary } from 'app/shared/model/diary.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDiaryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDiaryUpdateState {
  isNew: boolean;
}

export class DiaryUpdate extends React.Component<IDiaryUpdateProps, IDiaryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { diaryEntity } = this.props;
      const entity = {
        ...diaryEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/diary');
  };

  render() {
    const { diaryEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="junctionApp.diary.home.createOrEditLabel">Create or edit a Diary</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : diaryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="diary-id">ID</Label>
                    <AvInput id="diary-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="diary-content">
                    Content
                  </Label>
                  <AvField id="diary-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="diary-createdAt">
                    Created At
                  </Label>
                  <AvField id="diary-createdAt" type="date" className="form-control" name="createdAt" />
                </AvGroup>
                <AvGroup>
                  <Label id="userIdLabel" for="diary-userId">
                    User Id
                  </Label>
                  <AvField id="diary-userId" type="string" className="form-control" name="userId" />
                </AvGroup>
                <AvGroup>
                  <Label id="nLabel" for="diary-n">
                    N
                  </Label>
                  <AvField id="diary-n" type="text" name="n" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/diary" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  diaryEntity: storeState.diary.entity,
  loading: storeState.diary.loading,
  updating: storeState.diary.updating,
  updateSuccess: storeState.diary.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiaryUpdate);

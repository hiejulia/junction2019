import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Diary from './diary';
import DiaryDetail from './diary-detail';
import DiaryUpdate from './diary-update';
import DiaryDeleteDialog from './diary-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DiaryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DiaryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DiaryDetail} />
      <ErrorBoundaryRoute path={match.url} component={Diary} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DiaryDeleteDialog} />
  </>
);

export default Routes;

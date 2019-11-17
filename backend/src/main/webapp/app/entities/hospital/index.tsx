import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Hospital from './hospital';
import HospitalDetail from './hospital-detail';
import HospitalUpdate from './hospital-update';
import HospitalDeleteDialog from './hospital-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HospitalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HospitalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HospitalDetail} />
      <ErrorBoundaryRoute path={match.url} component={Hospital} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HospitalDeleteDialog} />
  </>
);

export default Routes;

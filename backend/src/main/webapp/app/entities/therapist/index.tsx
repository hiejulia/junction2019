import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Therapist from './therapist';
import TherapistDetail from './therapist-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TherapistDetail} />
      <ErrorBoundaryRoute path={match.url} component={Therapist} />
    </Switch>
  </>
);

export default Routes;

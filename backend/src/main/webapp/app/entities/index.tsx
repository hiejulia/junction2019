import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Hospital from './hospital';
import Diary from './diary';
import Therapist from './therapist';
import FaceImage from './face-image';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}hospital`} component={Hospital} />
      <ErrorBoundaryRoute path={`${match.url}diary`} component={Diary} />
      <ErrorBoundaryRoute path={`${match.url}therapist`} component={Therapist} />
      <ErrorBoundaryRoute path={`${match.url}face-image`} component={FaceImage} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

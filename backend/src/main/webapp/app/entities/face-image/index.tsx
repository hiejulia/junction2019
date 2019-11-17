import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FaceImage from './face-image';
import FaceImageDetail from './face-image-detail';
import FaceImageUpdate from './face-image-update';
import FaceImageDeleteDialog from './face-image-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FaceImageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FaceImageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FaceImageDetail} />
      <ErrorBoundaryRoute path={match.url} component={FaceImage} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FaceImageDeleteDialog} />
  </>
);

export default Routes;

import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITherapist, defaultValue } from 'app/shared/model/therapist.model';

export const ACTION_TYPES = {
  FETCH_THERAPIST_LIST: 'therapist/FETCH_THERAPIST_LIST',
  FETCH_THERAPIST: 'therapist/FETCH_THERAPIST',
  RESET: 'therapist/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITherapist>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TherapistState = Readonly<typeof initialState>;

// Reducer

export default (state: TherapistState = initialState, action): TherapistState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_THERAPIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THERAPIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_THERAPIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THERAPIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_THERAPIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THERAPIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/therapists';

// Actions

export const getEntities: ICrudGetAllAction<ITherapist> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_THERAPIST_LIST,
  payload: axios.get<ITherapist>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITherapist> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THERAPIST,
    payload: axios.get<ITherapist>(requestUrl)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

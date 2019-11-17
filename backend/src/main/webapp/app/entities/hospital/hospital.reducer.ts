import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHospital, defaultValue } from 'app/shared/model/hospital.model';

export const ACTION_TYPES = {
  FETCH_HOSPITAL_LIST: 'hospital/FETCH_HOSPITAL_LIST',
  FETCH_HOSPITAL: 'hospital/FETCH_HOSPITAL',
  CREATE_HOSPITAL: 'hospital/CREATE_HOSPITAL',
  UPDATE_HOSPITAL: 'hospital/UPDATE_HOSPITAL',
  DELETE_HOSPITAL: 'hospital/DELETE_HOSPITAL',
  RESET: 'hospital/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHospital>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HospitalState = Readonly<typeof initialState>;

// Reducer

export default (state: HospitalState = initialState, action): HospitalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HOSPITAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOSPITAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOSPITAL):
    case REQUEST(ACTION_TYPES.UPDATE_HOSPITAL):
    case REQUEST(ACTION_TYPES.DELETE_HOSPITAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HOSPITAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOSPITAL):
    case FAILURE(ACTION_TYPES.CREATE_HOSPITAL):
    case FAILURE(ACTION_TYPES.UPDATE_HOSPITAL):
    case FAILURE(ACTION_TYPES.DELETE_HOSPITAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOSPITAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOSPITAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOSPITAL):
    case SUCCESS(ACTION_TYPES.UPDATE_HOSPITAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOSPITAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/hospitals';

// Actions

export const getEntities: ICrudGetAllAction<IHospital> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HOSPITAL_LIST,
  payload: axios.get<IHospital>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHospital> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOSPITAL,
    payload: axios.get<IHospital>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHospital> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOSPITAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHospital> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOSPITAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHospital> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOSPITAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

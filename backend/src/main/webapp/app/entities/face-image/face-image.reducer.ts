import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFaceImage, defaultValue } from 'app/shared/model/face-image.model';

export const ACTION_TYPES = {
  FETCH_FACEIMAGE_LIST: 'faceImage/FETCH_FACEIMAGE_LIST',
  FETCH_FACEIMAGE: 'faceImage/FETCH_FACEIMAGE',
  CREATE_FACEIMAGE: 'faceImage/CREATE_FACEIMAGE',
  UPDATE_FACEIMAGE: 'faceImage/UPDATE_FACEIMAGE',
  DELETE_FACEIMAGE: 'faceImage/DELETE_FACEIMAGE',
  RESET: 'faceImage/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFaceImage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FaceImageState = Readonly<typeof initialState>;

// Reducer

export default (state: FaceImageState = initialState, action): FaceImageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FACEIMAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FACEIMAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FACEIMAGE):
    case REQUEST(ACTION_TYPES.UPDATE_FACEIMAGE):
    case REQUEST(ACTION_TYPES.DELETE_FACEIMAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FACEIMAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FACEIMAGE):
    case FAILURE(ACTION_TYPES.CREATE_FACEIMAGE):
    case FAILURE(ACTION_TYPES.UPDATE_FACEIMAGE):
    case FAILURE(ACTION_TYPES.DELETE_FACEIMAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACEIMAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FACEIMAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FACEIMAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_FACEIMAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FACEIMAGE):
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

const apiUrl = 'api/face-images';

// Actions

export const getEntities: ICrudGetAllAction<IFaceImage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FACEIMAGE_LIST,
  payload: axios.get<IFaceImage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFaceImage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FACEIMAGE,
    payload: axios.get<IFaceImage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFaceImage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FACEIMAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFaceImage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FACEIMAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFaceImage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FACEIMAGE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

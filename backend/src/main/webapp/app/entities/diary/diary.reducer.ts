import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDiary, defaultValue } from 'app/shared/model/diary.model';

export const ACTION_TYPES = {
  FETCH_DIARY_LIST: 'diary/FETCH_DIARY_LIST',
  FETCH_DIARY: 'diary/FETCH_DIARY',
  CREATE_DIARY: 'diary/CREATE_DIARY',
  UPDATE_DIARY: 'diary/UPDATE_DIARY',
  DELETE_DIARY: 'diary/DELETE_DIARY',
  RESET: 'diary/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDiary>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DiaryState = Readonly<typeof initialState>;

// Reducer

export default (state: DiaryState = initialState, action): DiaryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DIARY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DIARY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DIARY):
    case REQUEST(ACTION_TYPES.UPDATE_DIARY):
    case REQUEST(ACTION_TYPES.DELETE_DIARY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DIARY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DIARY):
    case FAILURE(ACTION_TYPES.CREATE_DIARY):
    case FAILURE(ACTION_TYPES.UPDATE_DIARY):
    case FAILURE(ACTION_TYPES.DELETE_DIARY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIARY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIARY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DIARY):
    case SUCCESS(ACTION_TYPES.UPDATE_DIARY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DIARY):
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

const apiUrl = 'api/diaries';

// Actions

export const getEntities: ICrudGetAllAction<IDiary> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DIARY_LIST,
  payload: axios.get<IDiary>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDiary> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DIARY,
    payload: axios.get<IDiary>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDiary> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DIARY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDiary> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DIARY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDiary> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DIARY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

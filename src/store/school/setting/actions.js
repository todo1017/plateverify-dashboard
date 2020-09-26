import { createAction } from "redux-actions";

let actions = {
  GET_REQUEST    : 'SCHOOL/SETTING/GET_REQUEST',
  GET_SUCCESS    : 'SCHOOL/SETTING/GET_SUCCESS',
  GET_FAILURE    : 'SCHOOL/SETTING/GET_FAILURE',
  START_REQUEST  : 'SCHOOL/SETTING/START_REQUEST',
  START_SUCCESS  : 'SCHOOL/SETTING/START_SUCCESS',
  START_FAILURE  : 'SCHOOL/SETTING/START_FAILURE',
  UPDATE_REQUEST : 'SCHOOL/SETTING/UPDATE_REQUEST',
  UPDATE_SUCCESS : 'SCHOOL/SETTING/UPDATE_SUCCESS',
  UPDATE_FAILURE : 'SCHOOL/SETTING/UPDATE_FAILURE',
};

actions = {
  ...actions,
  get    : createAction(actions.GET_REQUEST),
  start  : createAction(actions.START_REQUEST),
  update : createAction(actions.UPDATE_REQUEST),
};

export default actions;

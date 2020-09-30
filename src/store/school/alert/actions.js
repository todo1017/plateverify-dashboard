import { createAction } from "redux-actions";

let actions = {
  SEARCH_REQUEST : 'SCHOOL/ALERT/SEARCH_REQUEST',
  SEARCH_SUCCESS : 'SCHOOL/ALERT/SEARCH_SUCCESS',
  SEARCH_FAILURE : 'SCHOOL/ALERT/SEARCH_FAILURE',
  VIEW_REQUEST   : 'SCHOOL/ALERT/VIEW_REQUEST',
  VIEW_SUCCESS   : 'SCHOOL/ALERT/VIEW_SUCCESS',
  VIEW_FAILURE   : 'SCHOOL/ALERT/VIEW_FAILURE',
  CHECK_REQUEST  : 'SCHOOL/ALERT/CHECK_REQUEST',
  CHECK_SUCCESS  : 'SCHOOL/ALERT/CHECK_SUCCESS',
  CHECK_FAILURE  : 'SCHOOL/ALERT/CHECK_FAILURE',
};

actions = {
  ...actions,
  search : createAction(actions.SEARCH_REQUEST),
  view   : createAction(actions.VIEW_REQUEST),
  check  : createAction(actions.CHECK_REQUEST),
};

export default actions;
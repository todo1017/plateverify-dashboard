import { createAction } from "redux-actions";

let actions = {
  SEARCH_REQUEST : 'SCHOOL/RECORD/SEARCH_REQUEST',
  SEARCH_SUCCESS : 'SCHOOL/RECORD/SEARCH_SUCCESS',
  SEARCH_FAILURE : 'SCHOOL/RECORD/SEARCH_FAILURE',
  VIEW_REQUEST   : 'SCHOOL/RECORD/VIEW_REQUEST',
  VIEW_SUCCESS   : 'SCHOOL/RECORD/VIEW_SUCCESS',
  VIEW_FAILURE   : 'SCHOOL/RECORD/VIEW_FAILURE',
};

actions = {
  ...actions,
  search : createAction(actions.SEARCH_REQUEST),
  view   : createAction(actions.VIEW_REQUEST),
};

export default actions;
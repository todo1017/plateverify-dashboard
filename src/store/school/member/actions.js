import { createAction } from "redux-actions";

let actions = {
  LIST_REQUEST    : 'SCHOOL/MEMBER/LIST_REQUEST',
  LIST_SUCCESS    : 'SCHOOL/MEMBER/LIST_SUCCESS',
  LIST_FAILURE    : 'SCHOOL/MEMBER/LIST_FAILURE',
  VIEW_REQUEST    : 'SCHOOL/MEMBER/VIEW_REQUEST',
  VIEW_SUCCESS    : 'SCHOOL/MEMBER/VIEW_SUCCESS',
  VIEW_FAILURE    : 'SCHOOL/MEMBER/VIEW_FAILURE',
  PARSE_REQUEST   : 'SCHOOL/MEMBER/PARSE_REQUEST',
  PARSE_SUCCESS   : 'SCHOOL/MEMBER/PARSE_SUCCESS',
  PARSE_FAILURE   : 'SCHOOL/MEMBER/PARSE_FAILURE',
  PARSE_CLEAR     : 'SCHOOL/MEMBER/PARSE_CLEAR',
  UPLOAD_REQUEST  : 'SCHOOL/MEMBER/UPLOAD_REQUEST',
  UPLOAD_SUCCESS  : 'SCHOOL/MEMBER/UPLOAD_SUCCESS',
  UPLOAD_FAILURE  : 'SCHOOL/MEMBER/UPLOAD_FAILURE',
  UPDATE_REQUEST  : 'SCHOOL/MEMBER/UPDATE_REQUEST',
  UPDATE_SUCCESS  : 'SCHOOL/MEMBER/UPDATE_SUCCESS',
  UPDATE_FAILURE  : 'SCHOOL/MEMBER/UPDATE_FAILURE',
  REMOVE_REQUEST  : 'SCHOOL/MEMBER/REMOVE_REQUEST',
  REMOVE_SUCCESS  : 'SCHOOL/MEMBER/REMOVE_SUCCESS',
  REMOVE_FAILURE  : 'SCHOOL/MEMBER/REMOVE_FAILURE',
  FIND_REQUEST    : 'SCHOOL/MEMBER/FIND_REQUEST',
  FIND_SUCCESS    : 'SCHOOL/MEMBER/FIND_SUCCESS',
  FIND_FAILURE    : 'SCHOOL/MEMBER/FIND_FAILURE',
  CONNECT_REQUEST : 'SCHOOL/MEMBER/CONNECT_REQUEST',
  CONNECT_SUCCESS : 'SCHOOL/MEMBER/CONNECT_SUCCESS',
  CONNECT_FAILURE : 'SCHOOL/MEMBER/CONNECT_FAILURE',
};

actions = {
  ...actions,
  list       : createAction(actions.LIST_REQUEST),
  view       : createAction(actions.VIEW_REQUEST),
  parse      : createAction(actions.PARSE_REQUEST),
  parseClear : createAction(actions.PARSE_CLEAR),
  upload     : createAction(actions.UPLOAD_REQUEST),
  update     : createAction(actions.UPDATE_REQUEST),
  remove     : createAction(actions.REMOVE_REQUEST),
  find       : createAction(actions.FIND_REQUEST),
  connect    : createAction(actions.CONNECT_REQUEST),
};

export default actions;

import { createAction } from "redux-actions";

let actions = {
  LIST_REQUEST : 'SCHOOL/OFFENDER/LIST_REQUEST',
  LIST_SUCCESS : 'SCHOOL/OFFENDER/LIST_SUCCESS',
  LIST_FAILURE : 'SCHOOL/OFFENDER/LIST_FAILURE',
};

actions = {
  ...actions,
  offenderList: createAction(actions.LIST_REQUEST),
};

export default actions;

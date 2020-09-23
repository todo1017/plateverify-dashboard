import { createAction } from "redux-actions";

let actions = {
  TOKEN_REQUEST : 'TOKEN_REQUEST',
  TOKEN_SUCCESS : 'TOKEN_SUCCESS',
  TOKEN_FAILURE : 'TOKEN_FAILURE',
  TOKEN_END : 'TOKEN_END',
  LOGIN_REQUEST : 'LOGIN_REQUEST',
  LOGIN_SUCCESS : 'LOGIN_SUCCESS',
  LOGIN_FAILURE : 'LOGIN_FAILURE'
};

actions = {
  ...actions,
  verifyToken: createAction(actions.TOKEN_REQUEST),
  verifyLogin: createAction(actions.LOGIN_REQUEST)
};

export default actions;

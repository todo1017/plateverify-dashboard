import actions from './actions';

const {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  TOKEN_END,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} = actions;

const initialState = {
  action: null,
  user: null
};

export default (state = initialState, action) => {

  let baseState = {
    ...state,
    action: action.type
  };

  switch (action.type) {
    case TOKEN_REQUEST:
    case TOKEN_FAILURE:
    case TOKEN_END:
    case LOGIN_REQUEST:
    case LOGIN_FAILURE:
      return baseState;
    case TOKEN_SUCCESS:
    case LOGIN_SUCCESS:
      return {...baseState, ...action.payload};

    default:
      return state;
  }
};

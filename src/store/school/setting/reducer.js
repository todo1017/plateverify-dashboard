import actions from './actions';

const {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} = actions;

const initialState = {
  setting: null,
  action: null,
  error: null
};

export default (state = initialState, action) => {

  let baseState = {
    ...state,
    action: action.type
  };

  switch (action.type) {
    case GET_REQUEST:
    case UPDATE_REQUEST:
      return baseState;
    case GET_FAILURE:
    case UPDATE_FAILURE:
      return {
        ...baseState,
        error: payload.error
      };
    case GET_SUCCESS:
    case UPDATE_SUCCESS:
      return {
        ...baseState,
        setting: payload.setting,
      };
    default:
      return state;
  }
};

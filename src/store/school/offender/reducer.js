import actions from './actions';

const {
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
} = actions;

const initialState = {
  offenders: [],
  pagination: {},
  action: null,
  error: null
};

export default (state = initialState, action) => {

  const { type, payload } = action;

  let baseState = {
    ...state,
    action: type
  };

  switch (type) {
    case LIST_REQUEST:
    case LIST_FAILURE:
      return baseState;
    case LIST_SUCCESS:
      return {
        ...baseState,
        offenders: payload.offenders,
        pagination: payload.meta
      };
    default:
      return state;
  }
};

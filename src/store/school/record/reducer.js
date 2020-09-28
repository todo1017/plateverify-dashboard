import actions from './actions';

const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  VIEW_REQUEST,
  VIEW_SUCCESS,
  VIEW_FAILURE,
} = actions;

const initialState = {
  records: [],
  pagination: {
    currentPage: 1,
    totalItems: 0
  },
  view: null,
  action: null,
  error: null,
};

export default (state = initialState, action) => {

  const { type, payload } = action;

  let baseState = {
    ...state,
    action: type
  };

  switch (type) {
    case SEARCH_REQUEST:
      return baseState;
    case VIEW_REQUEST:
      return {
        ...baseState,
        view: null
      };
    case SEARCH_FAILURE:
    case VIEW_FAILURE:
      return {
        ...baseState,
        error: payload.error
      };
    case SEARCH_SUCCESS:
      return {
        ...baseState,
        records: payload.records,
        pagination: payload.meta
      };
    case VIEW_SUCCESS:
      return {
        ...baseState,
        view: payload.view,
      };
    default:
      return state;
  }
};

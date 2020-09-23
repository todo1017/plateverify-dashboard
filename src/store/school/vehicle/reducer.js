import actions from './actions';

const {
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
  VIEW_REQUEST,
  VIEW_SUCCESS,
  VIEW_FAILURE,
  PARSE_REQUEST,
  PARSE_SUCCESS,
  PARSE_FAILURE,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  REMOVE_REQUEST,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
} = actions;

const initialState = {
  vehicles: [],
  pagination: {},
  view: null,
  parsed: null,
  action: null,
  error: null
};

export default (state = initialState, action) => {

  let baseState = {
    ...state,
    action: action.type
  };

  switch (action.type) {
    case LIST_REQUEST:
    case VIEW_REQUEST:
    case PARSE_REQUEST:
    case UPLOAD_REQUEST:
    case UPDATE_REQUEST:
    case REMOVE_REQUEST:
      return baseState;
    case LIST_FAILURE:
    case VIEW_FAILURE:
    case PARSE_FAILURE:
    case UPLOAD_FAILURE:
    case UPDATE_FAILURE:
    case REMOVE_FAILURE:
      return {
        ...baseState,
        error: payload.error
      };
    case LIST_SUCCESS:
      return {
        ...baseState,
        vehicles: payload.vehicles,
        pagination: payload.meta
      };
    case VIEW_SUCCESS:
      return {
        ...baseState,
        view: payload.view,
      };
    case PARSE_SUCCESS:
      return {
        ...baseState,
        parsed: payload.parsed
      };
    case UPLOAD_SUCCESS:
      return {
        ...baseState,
        failed: payload.failed,
        parsed: null
      };
    case UPDATE_SUCCESS:
      return {
        ...baseState,
        view: payload.view,
      };
    case REMOVE_SUCCESS:
      return {
        ...baseState,
        view: null,
      };
    default:
      return state;
  }
};

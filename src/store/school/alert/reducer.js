import moment from "moment";
import actions from './actions';

const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  VIEW_REQUEST,
  VIEW_SUCCESS,
  VIEW_FAILURE,
  CHECK_REQUEST,
  CHECK_SUCCESS,
  CHECK_FAILURE,
} = actions;

const initialState = {
  alerts: [],
  filter: {
    status: 'active',
    startDate: moment().startOf('day'),
    endDate: moment().add(1, 'day').startOf('day')
  },
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

  let alerts;

  switch (type) {
    case SEARCH_REQUEST:
    case VIEW_REQUEST:
    case CHECK_REQUEST:
      return baseState;
    case SEARCH_FAILURE:
    case VIEW_FAILURE:
    case CHECK_FAILURE:
      return {
        ...baseState,
        error: payload.error
      };
    case SEARCH_SUCCESS:
      return {
        ...baseState,
        alerts: payload.alerts,
        pagination: payload.meta,
        filter: payload.filter
      };
    case VIEW_SUCCESS:
      return {
        ...baseState,
        view: payload.view,
      };
    case CHECK_SUCCESS:
      if (state.alerts.length) {
        alerts = state.alerts.filter(alert => alert.id !== payload.id)
      }
      return {
        ...baseState,
        alerts
      };
    default:
      return state;
  }
};

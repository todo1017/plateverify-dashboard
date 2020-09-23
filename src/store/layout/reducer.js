import actions from './actions';

const {
  WINDOW_WIDTH,
  TOGGLE_NAV,
  REGISTER_ROUTES
} = actions;

const initialState = {
  navCollapsed: false,
  width: window.innerWidth,
  routes: []
};

export default (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case TOGGLE_NAV:
			return {
				...state,
				navCollapsed: payload? payload : !state.navCollapsed
			};
    case WINDOW_WIDTH:
      return {
        ...state,
        width: payload
      };
    case REGISTER_ROUTES:
      return {
        ...state,
        routes: payload
      };
    default:
      return state;
  }
};

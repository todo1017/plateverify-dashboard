import { createAction } from "redux-actions";

let actions = {
  TOGGLE_NAV      : 'LAYOUT_TOGGLE_NAV',
  WINDOW_WIDTH    : 'LAYOUT_WINDOW_WIDTH',
  REGISTER_ROUTES : 'LAYOUT_REGISTER_ROUTES'
};

actions = {
  ...actions,
  updateWindowWidth : createAction(actions.WINDOW_WIDTH),
  toggleNav         : createAction(actions.TOGGLE_NAV),
  registerRoutes    : createAction(actions.REGISTER_ROUTES)
};

export default actions;

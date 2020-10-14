import actions from './actions';

const {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  START_REQUEST,
  START_SUCCESS,
  START_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} = actions;

const initialState = {
  settings: [],
  action: null,
  error: null
};

export default (state = initialState, action) => {

  const { type, payload } = action;
  let settings;
  let baseState = {
    ...state,
    action: type
  };

  switch (type) {
    case GET_REQUEST:
    case START_REQUEST:
    case UPDATE_REQUEST:
      return baseState;
    case GET_FAILURE:
    case START_FAILURE:
    case UPDATE_FAILURE:
      return {
        ...baseState,
        error: payload.error
      };
    case GET_SUCCESS:
      return {
        ...baseState,
        settings: payload.settings,
      };
    case START_SUCCESS:
      return {
        ...baseState,
        settings: [
          ...state.settings,
          payload.setting
        ]
      };
    case UPDATE_SUCCESS:
      settings = state.settings.map(setting => {
        if (setting.id === payload.setting.id) {
          return payload.setting;
        }
        return setting;
      });
      return {
        ...baseState,
        settings,
      };
    default:
      return state;
  }
};

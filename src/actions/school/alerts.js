import atom from "atoms/school/alerts";
import api from "api";

export const initAction =  ({snapshot, set}) => async () => {
  const state = await snapshot.getPromise(atom);
  if (!state.init && !state.isLoading) {
    set(atom, { ...state, isLoading: true });
    
    const response = await api.post('/alert/search', {
      page: 1,
      limit: 10,
      status: state.status,
      startDate: state.startDate.format('YYYY-MM-DD HH:mm'),
      endDate: state.endDate.format('YYYY-MM-DD HH:mm')
    });

    if (response) {
      set(atom, {
        ...state,
        init: true,
        isLoading: false,
        records: response.data.items,
        pagination: response.data.meta
      });
    } else {
      set(atom, {
        ...state,
        init: true,
        isLoading: false
      });
    }
  }
};

export const filterAction = ({snapshot, set}) => async (payload) => {
  const state = await snapshot.getPromise(atom);

  set(atom, {
    ...state,
    isLoading: true
  });

  const response = await api.post('/alert/search', {
    ...payload,
    limit: 10,
    startDate: payload.startDate.format('YYYY-MM-DD HH:mm'),
    endDate: payload.endDate.format('YYYY-MM-DD HH:mm')
  });

  if (response) {
    set(atom, {
      ...state,
      init: true,
      isLoading: false,
      records: response.data.items,
      pagination: response.data.meta,
      status: payload.status,
      startDate: payload.startDate,
      endDate: payload.endDate
    });
  } else {
    set(atom, {
      ...state,
      init: true,
      isLoading: false
    });
  }

};

export const paginateAction = ({snapshot, set}) => async (page) => {
  const state = await snapshot.getPromise(atom);

  set(atom, {
    ...state,
    isLoading: true
  });

  const response = await api.post('/alert/search', {
    page,
    limit: 10,
    status: state.status,
    startDate: state.startDate.format('YYYY-MM-DD HH:mm'),
    endDate: state.endDate.format('YYYY-MM-DD HH:mm')
  });

  if (response) {
    set(atom, {
      ...state,
      init: true,
      isLoading: false,
      records: response.data.items,
      pagination: response.data.meta,
    });
  } else {
    set(atom, {
      ...state,
      init: true,
      isLoading: false
    });
  }

};
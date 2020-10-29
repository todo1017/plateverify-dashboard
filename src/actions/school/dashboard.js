import atom from "atoms/school/dashboard";
import api from "api";

export const initAction =  ({snapshot, set}) => async () => {
  const state = await snapshot.getPromise(atom);
  if (!state.init && !state.isLoading) {
    set(atom, { ...state, isLoading: true });

    const response = await api.post('/record/search', {
      page: 1,
      limit: 10,
      startDate: state.startDate.format('YYYY-MM-DD HH:mm'),
      endDate: state.endDate.format('YYYY-MM-DD HH:mm')
    });
    const stats = await api.post('/record/stats');

    if (response) {
      set(atom, {
        ...state,
        init: true,
        isLoading: false,
        stats: stats.data,
        items: response.data.items,
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

  const response = await api.post('/record/search', {
    ...payload,
    limit: 10,
    startDate: payload.startDate.format('YYYY-MM-DD HH:mm'),
    endDate: payload.endDate.format('YYYY-MM-DD HH:mm')
  });
  const stats = await api.post('/record/stats');

  if (response) {
    set(atom, {
      ...state,
      init: true,
      isLoading: false,
      stats: stats.data,
      items: response.data.items,
      pagination: response.data.meta,
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

  const response = await api.post('/record/search', {
    page,
    limit: 10,
    startDate: state.startDate.format('YYYY-MM-DD HH:mm'),
    endDate: state.endDate.format('YYYY-MM-DD HH:mm')
  });
  const stats = await api.post('/record/stats');

  if (response) {
    set(atom, {
      ...state,
      init: true,
      isLoading: false,
      stats: stats.data,
      items: response.data.items,
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
import atom from "atoms/admin/user";
import api from "api";

export const initAction =  ({snapshot, set}) => async () => {
  const state = await snapshot.getPromise(atom);
  if (!state.init && !state.isLoading) {
    set(atom, { ...state, isLoading: true });

    const response = await api.post('/user/list');

    if (response) {
      set(atom, {
        ...state,
        init: true,
        isLoading: false,
        data: response.data,
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

export const addAction =  ({snapshot, set}) => async (user) => {
  const state = await snapshot.getPromise(atom);
  if (state.init && !state.isLoading) {
    set(atom, {
      ...state,
      data: [
        ...state.data,
        user
      ]
    });
  }
};

export const removeAction =  ({snapshot, set}) => async (user) => {
  const state = await snapshot.getPromise(atom);
  if (state.init && !state.isLoading) {
    set(atom, {
      ...state,
      data: state.data.filter(d => d.id !== user.id)
    });
  }
};

export const updateUserAction =  ({snapshot, set}) => async (user) => {
  const state = await snapshot.getPromise(atom);
  if (state.init && !state.isLoading) {
    const users = state.data.map(d => {
      if (d.id === user.id) {
        return user;
      }
      return d;
    });
    set(atom, {
      ...state,
      data: users
    });
  }
};
import atom from "atoms/admin/school";
import api from "api";

export const initAction =  ({snapshot, set}) => async () => {
  const state = await snapshot.getPromise(atom);
  if (!state.init && !state.isLoading) {
    set(atom, { ...state, isLoading: true });

    const response = await api.post('/school/list');

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

export const addAction =  ({snapshot, set}) => async (school) => {
  const state = await snapshot.getPromise(atom);
  if (state.init && !state.isLoading) {
    set(atom, {
      ...state,
      data: [
        ...state.data,
        school
      ]
    });
  }
};

export const updateSchoolAction =  ({snapshot, set}) => async (school) => {
  const state = await snapshot.getPromise(atom);
  if (state.init && !state.isLoading) {
    const schools = state.data.map(d => {
      if (d.id === school.id) {
        return school;
      }
      return d;
    });
    set(atom, {
      ...state,
      data: schools
    });
  }
};
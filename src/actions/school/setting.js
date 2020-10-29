import atom from "atoms/school/setting";
import api from "api";

export const initAction =  ({snapshot, set}) => async () => {
  const state = await snapshot.getPromise(atom);
  if (!state.init && !state.isLoading) {
    set(atom, { ...state, isLoading: true });
    
    const response = await api.post('/setting/all');

    if (response) {
      set(atom, {
        ...state,
        init: true,
        isLoading: false,
        alert: response.data.filter(item => item.category === 'alert')[0] || null
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

export const startAlertAction =  ({snapshot, set}) => async () => {
  const state = await snapshot.getPromise(atom);
  set(atom, { ...state, isLoading: true });
  
  const response = await api.post('/setting/start', { category: 'alert' });

  if (response) {
    set(atom, {
      ...state,
      isLoading: false,
      alert: response.data
    });
  } else {
    set(atom, { ...state, isLoading: false });
  }
};

export const addEntityAction =  ({snapshot, set}) => async (type, entity) => {
  const state = await snapshot.getPromise(atom);
  set(atom, { ...state, isLoading: true });

  const data = {
    category: 'alert',
    body: [
      ...state.alert.body,
      {
        type,
        entity,
        offender: false,
        flagged: false
      }
    ]
  };
  
  const response = await api.post('/setting/update', data);

  if (response) {
    set(atom, {
      ...state,
      isLoading: false,
      alert: response.data
    });
  } else {
    set(atom, { ...state, isLoading: false });
  }
};

export const toggleOptionAction =  ({snapshot, set}) => async (index, option, value) => {
  const state = await snapshot.getPromise(atom);
  set(atom, { ...state, isLoading: true });

  let body = state.alert.body.map((d, i) => {
    if (i === index) {
      return {
        ...d,
        [option]: value
      };
    }
    return d;
  });
  
  const response = await api.post('/setting/update', {
    category: 'alert',
    body
  });

  if (response) {
    set(atom, {
      ...state,
      isLoading: false,
      alert: response.data
    });
  } else {
    set(atom, { ...state, isLoading: false });
  }
};

export const removeEntityAction =  ({snapshot, set}) => async (index) => {
  const state = await snapshot.getPromise(atom);
  set(atom, { ...state, isLoading: true });

  let body = state.alert.body.filter((d, i) => i !== index);
  
  const response = await api.post('/setting/update', {
    category: 'alert',
    body
  });

  if (response) {
    set(atom, {
      ...state,
      isLoading: false,
      alert: response.data
    });
  } else {
    set(atom, { ...state, isLoading: false });
  }
};
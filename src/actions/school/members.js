import atom from "atoms/school/members";
import api from "api";

const search = async (set, state, payload) => {
  set(atom, { ...state, isLoading: true });
  const response = await api.post('/member/list', payload);
  if (response) {
    set(atom, {
      ...state,
      init: true,
      isLoading: false,
      items: response.data.items,
      pagination: response.data.meta,
      group: payload.group
    });
  } else {
    set(atom, {
      ...state,
      init: true,
      isLoading: false
    });
  }
};

export const initAction = ({snapshot, set}) => async () => {
  const state = await snapshot.getPromise(atom);
  if (!state.init && !state.isLoading) {
    await search(set, state, {
      page: 1,
      limit: 10,
      group: state.group
    });
  }
};

export const filterAction = ({snapshot, set}) => async (group) => {
  const state = await snapshot.getPromise(atom);
  await search(set, state, {
    page: 1,
    limit: 10,
    group
  });
};

export const paginateAction = ({snapshot, set}) => async (page) => {
  const state = await snapshot.getPromise(atom);
  await search(set, state, {
    page,
    limit: 10,
    group: state.group
  });
};

export const updateFieldsAction = ({snapshot, set}) => async (member, fields) => {
  const state = await snapshot.getPromise(atom);
  const items = state.items.map(item => {
    if (item.id === member.id) {
      return {
        ...item,
        ...fields
      };
    }
    return item;
  });
  set(atom, {
    ...state,
    items
  });
};
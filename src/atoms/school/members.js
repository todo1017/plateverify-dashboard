import { atom } from "recoil";

const membersAtom = atom({
  key: 'memberListState',
  default: {
    init: false,
    isLoading: false,
    items: [],
    group: 'all',
    pagination: {
      currentPage: 1,
      totalItems: 0
    }
  },
});

export default membersAtom;
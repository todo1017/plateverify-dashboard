import { atom } from "recoil";

const memberListAtom = atom({
  key: 'memberListState',
  default: {
    init: false,
    isLoading: false,
    group: 'all',
    items: [],
    pagination: {
      currentPage: 1,
      totalItems: 0
    }
  },
});

export default memberListAtom;
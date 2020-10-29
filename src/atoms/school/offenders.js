import { atom } from "recoil";

const offendersAtom = atom({
  key: 'offendersState',
  default: {
    init: false,
    isLoading: false,
    items: [],
    pagination: {
      currentPage: 1,
      totalItems: 0
    },
  },
});

export default offendersAtom;
import { atom } from "recoil";

const offenderAtom = atom({
  key: 'adminOffenderState',
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

export default offenderAtom;
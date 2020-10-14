import { atom } from "recoil";

const offenderListAtom = atom({
  key: 'offenderListState',
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

export default offenderListAtom;
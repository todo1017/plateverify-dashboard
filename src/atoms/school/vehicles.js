import { atom } from "recoil";

const vehiclesAtom = atom({
  key: 'vehiclesState',
  default: {
    init: false,
    isLoading: false,
    items: [],
    pagination: {
      currentPage: 1,
      totalItems: 0
    }
  },
});

export default vehiclesAtom;
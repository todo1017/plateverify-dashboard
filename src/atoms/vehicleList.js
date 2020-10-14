import { atom } from "recoil";

const vehicleListAtom = atom({
  key: 'vehicleListState',
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

export default vehicleListAtom;
import { atom } from "recoil";

const memberViewAtom = atom({
  key: 'memberViewState',
  default: {
    isLoading: false,
    isUpdating: false,
    data: null
  },
});

export default memberViewAtom;
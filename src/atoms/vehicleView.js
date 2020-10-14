import { atom } from "recoil";

const vehicleViewAtom = atom({
  key: 'vehicleViewState',
  default: {
    isLoading: false,
    isUpdating: false,
    data: null
  },
});

export default vehicleViewAtom;
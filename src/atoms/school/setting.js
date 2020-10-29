import { atom } from "recoil";

const settingAtom = atom({
  key: 'settingState',
  default: {
    init: false,
    isLoading: false,
    isUpdating: false, 
    alert: null
  },
});

export default settingAtom;
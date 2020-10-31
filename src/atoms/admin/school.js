import { atom } from "recoil";

const schoolAtom = atom({
  key: 'adminSchoolState',
  default: {
    init: false,
    isLoading: false,
    data: []
  }
});

export default schoolAtom;
import { atom } from "recoil";

const adminSchoolAtom = atom({
  key: 'adminSchoolState',
  default: {
    init: false,
    isLoading: false,
    data: []
  }
});

export default adminSchoolAtom;
import { atom } from "recoil";

const userAtom = atom({
  key: 'adminUserState',
  default: {
    init: false,
    isLoading: false,
    data: []
  }
});

export default userAtom;
import { atom } from "recoil";

const authAtom = atom({
  key: 'authState',
  default: {
    init: false,
    user: null,
    routes: [],
    loginChecking: false
  },
});

export default authAtom;
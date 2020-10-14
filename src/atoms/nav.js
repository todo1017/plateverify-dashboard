import { atom } from "recoil";

const navAtom = atom({
  key: 'navState',
  default: {
    open: false
  },
});

export default navAtom;
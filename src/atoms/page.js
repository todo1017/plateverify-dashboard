import { atom } from "recoil";

const pageAtom = atom({
  key: 'pageState',
  default: {
    title: ''
  },
});

export default pageAtom;
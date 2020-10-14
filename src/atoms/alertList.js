import { atom } from "recoil";
import moment from "moment";

const alertListAtom = atom({
  key: 'alertListState',
  default: {
    init: false,
    items: [],
    status: 'active',
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    pagination: {
      currentPage: 1,
      totalItems: 0
    },
    isLoading: false
  },
});

export default alertListAtom;
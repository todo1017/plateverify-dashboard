import { atom } from "recoil";
import moment from "moment";

const dashboardAtom = atom({
  key: 'dashboardState',
  default: {
    init: false,
    stats: {
      total: 0,
      student: 0,
      faculty: 0,
      unknown: 0
    },
    items: [],
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    pagination: {
      currentPage: 1,
      totalItems: 0
    },
    isLoading: false
  },
});

export default dashboardAtom;
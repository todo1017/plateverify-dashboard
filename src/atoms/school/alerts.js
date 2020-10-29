import { atom } from "recoil";
import moment from "moment";

const alertsAtom = atom({
  key: 'alertsState',
  default: {
    init: false,
    isLoading: false,
    records: [],
    status: 'active',
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    pagination: {
      currentPage: 1,
      totalItems: 0
    },
  },
});

export default alertsAtom;
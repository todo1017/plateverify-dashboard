import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from "moment";
import recordActions from "store/school/record/actions";
import TopCard from "./topCard";
import StreamItem from "./streamItem";

const useStyles = makeStyles({
  filterCard: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    '& > *+*': {
      marginLeft: 8
    },
    '& .MuiInputBase-root': {
      height: 36,
      fontSize: 14
    }
  },
  dateTimeBox: {
    width: 150,
  },
  streamItem: {
    marginTop: 16,
    padding: 16
  },
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  justifyCenter: {
    justifyContent: 'center'
  }
});

const useEffectOnce = func => useEffect(func, []);

const Dashboard = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const recordState = useSelector(state => state.School.Record);
  const [startDate, setStartDate] = useState(moment().startOf('day'));
  const [endDate, setEndDate] = useState(moment().add(1, 'day').startOf('day'));
  const [oldStartDate, setOldStartDate] = useState(moment().startOf('day'));
  const [oldEndDate, setOldEndDate] = useState(moment().add(1, 'day').startOf('day'));
  const [isChanged, setIsChanged] = useState(false);
  const pageCount = Math.ceil(recordState.pagination.totalItems / 10);

  useEffectOnce(() => {
    if (recordState.records.length === 0) {
      dispatch(recordActions.search({
        page: 1,
        limit: 10,
        startDate: oldStartDate.format('YYYY-MM-DD 00:00:00'),
        endDate: oldEndDate.format('YYYY-MM-DD 00:00:00')
      }));
    }
  });

  useEffect(() => {
    const newDates = startDate.format('YYYY-MM-DD hh:mm:ss') + endDate.format('YYYY-MM-DD hh:mm:ss');
    const oldDates = oldStartDate.format('YYYY-MM-DD hh:mm:ss') + oldEndDate.format('YYYY-MM-DD hh:mm:ss');
    if (newDates === oldDates) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  }, [startDate, endDate, oldStartDate, oldEndDate]);

  const updateDate = () => {
    dispatch(recordActions.search({
      page: 1,
      limit: 10,
      startDate: startDate.format('YYYY-MM-DD 00:00:00'),
      endDate: endDate.format('YYYY-MM-DD 00:00:00')
    }));
    setOldStartDate(startDate);
    setOldEndDate(endDate);
  };

  const handlePagination = (e, page) => {
    console.log(page);
    dispatch(recordActions.search({
      page,
      limit: 10,
      startDate: oldStartDate.format('YYYY-MM-DD 00:00:00'),
      endDate: oldEndDate.format('YYYY-MM-DD 00:00:00')
    }));
  }

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.space}>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Total Vehicles"
                desc="all vehicles"
                value="123"
                color="indigo" />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Student"
                desc="students registered"
                value="123"
                color="success" />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Faculty"
                desc="faculties registered"
                value="123"
                color="info" />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Unknown"
                desc="unregistered"
                value="123"
                color="pink accent-2" />
            </div>
          </div>

          <Paper className={classes.filterCard}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                className={classes.dateTimeBox}
                format="yyyy/MM/DD HH:mm"
                inputVariant="outlined"
                value={startDate}
                onChange={setStartDate} />
              <DateTimePicker
                className={classes.dateTimeBox}
                format="yyyy/MM/DD HH:mm"
                inputVariant="outlined"
                value={endDate}
                onChange={setEndDate} />
            </MuiPickersUtilsProvider>
            {isChanged &&
              <Button variant="contained" color="secondary" onClick={updateDate}>
                Apply
              </Button>
            }
          </Paper>

          <Pagination
            classes={{ ul: classes.justifyCenter }}
            count={pageCount}
            page={recordState.pagination.currentPage}
            onChange={handlePagination} />

          <Paper className={classes.streamItem}>
            {recordState.records.map(record =>
              <StreamItem record={record} key={record.id} />
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
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
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [filterChanged, setFilterChanged] = useState(false);
  const pageCount = Math.ceil(recordState.pagination.totalItems / 10);

  useEffectOnce(() => {
    if (recordState.records.length === 0) {
      dispatch(recordActions.search({
        page: 1,
        limit: 10,
        startDate: recordState.filter.startDate,
        endDate: recordState.filter.endDate
      }));
    }
    setStartDate(recordState.filter.startDate);
    setEndDate(recordState.filter.endDate);
  });

  useEffect(() => {
    let {startDate: startDate_, endDate: endDate_ } = recordState.filter;
    let newStr = startDate.format('YYYYMMDDhhmmss') + endDate.format('YYYYMMDDhhmmss');
    let oldStr = startDate_.format('YYYYMMDDhhmmss') + endDate_.format('YYYYMMDDhhmmss');
    setFilterChanged(newStr !== oldStr);
  }, [startDate, endDate, recordState.filter]);

  const handlePagination = (e, page) => {
    dispatch(recordActions.search({
      page,
      limit: 10,
      startDate: recordState.filter.startDate,
      endDate: recordState.filter.endDate,
    }));
  }

  const applyFilter = () => {
    dispatch(recordActions.search({
      page: 1,
      limit: 10,
      startDate,
      endDate
    }));
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.space}>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Total Vehicles"
                desc="all vehicles"
                value={recordState.stats.total}
                color="indigo" />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Student"
                desc="students registered"
                value={recordState.stats.student}
                color="success" />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Faculty"
                desc="faculties registered"
                value={recordState.stats.faculty}
                color="info" />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <TopCard
                title="Unknown"
                desc="unregistered"
                value={recordState.stats.unknown}
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
            {filterChanged &&
              <Button variant="contained" color="secondary" onClick={applyFilter}>
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
            {recordState.records.length === 0 &&
              <div className="p-4 text-center flex-fill">NO RESULT</div>
            }
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
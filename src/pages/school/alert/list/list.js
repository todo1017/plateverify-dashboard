import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ToggleButton, ToggleButtonGroup, Pagination } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import * as moment from "moment";
import alertActions from "store/school/alert/actions";
import Item from "./item";

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
    },
    '& .MuiToggleButton-root.Mui-selected': {
      backgroundColor: '#424242',
      color: 'white'
    },
  },
  dateTimeBox: {
    width: 110,
  },
  item: {
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
  const alertState = useSelector(state => state.School.Alert);
  const [status, setStatus] = useState('active');
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [filterChanged, setFilterChanged] = useState(false);
  const pageCount = Math.ceil(alertState.pagination.totalItems / 10);

  useEffectOnce(() => {
    if (alertState.alerts.length === 0) {
      dispatch(alertActions.search({
        page: 1,
        limit: 10,
        startDate: alertState.filter.startDate,
        endDate: alertState.filter.endDate,
        status: alertState.filter.status
      }));
    }
    setStatus(alertState.filter.status);
    setStartDate(alertState.filter.startDate);
    setEndDate(alertState.filter.endDate);
  });

  useEffect(() => {
    let {startDate: startDate_, endDate: endDate_, status: status_} = alertState.filter;
    let newStr = startDate.format('YYYY-MM-DD') + endDate.format('YYYY-MM-DD') + status;
    let oldStr = startDate_.format('YYYY-MM-DD') + endDate_.format('YYYY-MM-DD') + status_;
    setFilterChanged(newStr !== oldStr);
  }, [status, startDate, endDate, alertState.filter]);

  const handlePagination = (e, page) => {
    dispatch(alertActions.search({
      page,
      limit: 10,
      startDate: alertState.filter.startDate,
      endDate: alertState.filter.endDate,
      status: alertState.filter.status
    }));
  }

  const handleChangeActive= (event, value) => {
    if (value) {
      setStatus(value);
    }
  };

  const applyFilter = () => {
    dispatch(alertActions.search({
      page: 1,
      limit: 10,
      startDate,
      endDate,
      status
    }));
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.space}>
          <Paper className={classes.filterCard}>
            <ToggleButtonGroup
              size="small"
              value={status}
              onChange={handleChangeActive}
              exclusive>
              <ToggleButton value="active">Active</ToggleButton>
              <ToggleButton value="checked">Checked</ToggleButton>
            </ToggleButtonGroup>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker 
                className={classes.dateTimeBox}
                format="yyyy/MM/DD"
                inputVariant="outlined"
                value={startDate}
                onChange={setStartDate} />
              <DatePicker 
                className={classes.dateTimeBox}
                format="yyyy/MM/DD"
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
            page={alertState.pagination.currentPage}
            onChange={handlePagination} />

          <Paper className={classes.item}>
            {alertState.alerts.length === 0 &&
              <div className="p-4 text-center flex-fill">NO RESULT</div>
            }
            {alertState.alerts.map(alert =>
              <Item alert={alert} key={alert.id} />
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
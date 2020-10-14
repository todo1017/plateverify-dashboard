import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ToggleButton, ToggleButtonGroup, Pagination } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import alertListAtom from "atoms/alertList";
import { useEffectOnlyOnce } from "util/custom";
import api from "containers/api";
import StatusBox from "components/_custom/statusBox";
import AlertBox from "./alertBox";

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
    width: 150,
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

const AlertList = () => {

  const classes = useStyles();
  const [alertList, setAlertList] = useRecoilState(alertListAtom);
  const [status, setStatus] = useState('active');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const pageCount = Math.ceil(alertList.pagination.totalItems / 10);

  const search = async payload => {
    setAlertList({ ...alertList, isLoading: true });
    const response = await api.post('/alert/search', {
      ...payload,
      startDate: payload.startDate.format('YYYY-MM-DD HH:mm'),
      endDate: payload.endDate.format('YYYY-MM-DD HH:mm')
    });
    if (response) {
      setAlertList({
        ...alertList,
        init: true,
        isLoading: false,
        items: response.data.items,
        pagination: response.data.meta,
        startDate: payload.startDate,
        endDate: payload.endDate,
        status: payload.status
      });
    } else {
      setAlertList({ ...alertList, isLoading: false });
    }
  }

  useEffectOnlyOnce(() => {
    if (!alertList.init) {
      search({
        page: 1,
        limit: 10,
        startDate: alertList.startDate,
        endDate: alertList.endDate,
        status: alertList.status
      });
    }
    setStartDate(alertList.startDate);
    setEndDate(alertList.endDate);
    setStatus(alertList.status);
  });

  const handlePagination = (e, page) => {
    search({
      page,
      limit: 10,
      startDate: alertList.startDate,
      endDate: alertList.endDate,
      status: alertList.status
    });
  };

  const handleStatusChange= (e, value) => {
    if (value) {
      setStatus(value);
    }
  };

  const applyFilter = () => {
    search({
      page: 1,
      limit: 10,
      startDate,
      endDate,
      status
    });
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.space}>
          <Paper className={classes.filterCard}>
            <ToggleButtonGroup
              size="small"
              value={status}
              onChange={handleStatusChange}
              exclusive
            >
              <ToggleButton value="active">Active</ToggleButton>
              <ToggleButton value="checked">Checked</ToggleButton>
            </ToggleButtonGroup>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                className={classes.dateTimeBox}
                format="YYYY/MM/DD HH:mm"
                inputVariant="outlined"
                value={startDate}
                onChange={setStartDate}
              />
              <DateTimePicker
                className={classes.dateTimeBox}
                format="YYYY/MM/DD HH:mm"
                inputVariant="outlined"
                value={endDate}
                onChange={setEndDate}
              />
            </MuiPickersUtilsProvider>
            <Button variant="contained" color="secondary" onClick={applyFilter}>
              Apply
            </Button>
          </Paper>
          <Pagination
            classes={{ ul: classes.justifyCenter }}
            count={pageCount}
            page={alertList.pagination.currentPage}
            onChange={handlePagination}
          />
          <Paper>
            <StatusBox
              height={100}
              status={alertList.isLoading ? 'wait' : alertList.items.length === 0 ? 'empty' : ''}
            >
              {alertList.items.map(alert =>
                <AlertBox alert={alert} key={alert.id} />
              )}
            </StatusBox>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AlertList;
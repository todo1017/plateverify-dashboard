import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import dashboardAtom from "atoms/school/dashboard";
import { filterAction, paginateAction } from "actions/school/dashboard";
import { ButtonGroup, Button, IconButton, Paper, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
  },
  currentPage: {
    marginLeft: 32
  },
  backdrop: {
    zIndex: 1000,
    color: '#fff',
  },
  filter: {
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
});

const RecordFilter = () => {

  const classes = useStyles();
  const dashboardState = useRecoilValue(dashboardAtom);
  const dashboardFilter = useRecoilCallback(filterAction);
  const dashboardPaginate = useRecoilCallback(paginateAction);
  const [filterOpen, setFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setStartDate(dashboardState.startDate);
    setEndDate(dashboardState.endDate);
  }, [dashboardState.startDate, dashboardState.endDate])

  const applyFilter = () => {
    setFilterOpen(false);
    dashboardFilter({
      page: 1,
      startDate,
      endDate
    });
  };

  const prevPage = () => {
    if (dashboardState.pagination.currentPage > 1) {
      dashboardPaginate(dashboardState.pagination.currentPage-1);
    }
  };
  const nextPage = () => {
    if (dashboardState.pagination.currentPage < dashboardState.pagination.totalPages) {
      dashboardPaginate(dashboardState.pagination.currentPage+1);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.pagination}>
        <ButtonGroup color="primary">
          <Button disabled={dashboardState.isLoading} onClick={prevPage}>prev</Button>
          <Button disabled={dashboardState.isLoading} onClick={nextPage}>next</Button>
        </ButtonGroup>
        <div className={classes.currentPage}>
          {dashboardState.pagination.currentPage} / {dashboardState.pagination.totalPages}
        </div>
      </div>
      <IconButton onClick={() => setFilterOpen(true)}>
        <SearchIcon />
      </IconButton>
      <Backdrop
        className={classes.backdrop}
        open={filterOpen}
        onClick={() => {}}
      >
        <Paper className={classes.filter}>
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
          <IconButton color="primary" onClick={applyFilter}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={() => setFilterOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default RecordFilter;
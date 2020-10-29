import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import alertsAtom from "atoms/school/alerts";
import { filterAction, paginateAction } from "actions/school/alerts";
import { ButtonGroup, Button, IconButton, Paper, Backdrop, TextField, MenuItem } from '@material-ui/core';
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
    width: 300,
    padding: 16,
  },
  space: {
    '& > *+*': {
      marginTop: 8
    }
  },
  spaceBig: {
    '& > *': {
      marginTop: 24
    }
  },
  alignCenter: {
    textAlign: 'center'
  }
});

const RecordFilter = () => {

  const classes = useStyles();
  const alertsState = useRecoilValue(alertsAtom);
  const alertsFilter = useRecoilCallback(filterAction);
  const alertsPaginate = useRecoilCallback(paginateAction);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setStartDate(alertsState.startDate);
    setEndDate(alertsState.endDate);
    setStatus(alertsState.status);
  }, [alertsState.startDate, alertsState.endDate, alertsState.status])

  const applyFilter = () => {
    setFilterOpen(false);
    alertsFilter({
      page: 1,
      startDate,
      endDate,
      status
    });
  };

  const prevPage = () => {
    if (alertsState.pagination.currentPage > 1) {
      alertsPaginate(alertsState.pagination.currentPage-1);
    }
  };
  const nextPage = () => {
    if (alertsState.pagination.currentPage < alertsState.pagination.totalPages) {
      alertsPaginate(alertsState.pagination.currentPage+1);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.pagination}>
        <ButtonGroup color="primary">
          <Button disabled={alertsState.isLoading} onClick={prevPage}>prev</Button>
          <Button disabled={alertsState.isLoading} onClick={nextPage}>next</Button>
        </ButtonGroup>
        <div className={classes.currentPage}>
          {alertsState.pagination.currentPage} / {alertsState.pagination.totalPages}
        </div>
      </div>
      <IconButton disabled={alertsState.isLoading} onClick={() => setFilterOpen(true)}>
        <SearchIcon />
      </IconButton>
      <Backdrop
        className={classes.backdrop}
        open={filterOpen}
        onClick={() => {}}
      >
        <Paper className={classes.filter}>
          <div className={classes.space}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div className={classes.spaceBig}>
                <DateTimePicker
                  fullWidth
                  label="Start Date"
                  inputVariant="outlined"
                  format="YYYY/MM/DD HH:mm"
                  className={classes.dateTimeBox}
                  value={startDate}
                  onChange={setStartDate}
                />
                <DateTimePicker
                  fullWidth
                  label="End Date"
                  inputVariant="outlined"
                  format="YYYY/MM/DD HH:mm"
                  className={classes.dateTimeBox}
                  value={endDate}
                  onChange={setEndDate}
                />
                <TextField
                  select
                  fullWidth
                  label="Status"
                  variant="outlined"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="checked">Checked</MenuItem>
                </TextField>
              </div>
            </MuiPickersUtilsProvider>
            <div className={classes.alignCenter}>
              <IconButton color="primary" onClick={applyFilter}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => setFilterOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default RecordFilter;
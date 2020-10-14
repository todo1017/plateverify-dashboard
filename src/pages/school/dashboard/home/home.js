import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Paper, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import api from "containers/api";
import dashboardAtom from "atoms/dashboard";
import StatusBox from "components/_custom/statusBox";
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
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300
  }
});

const useEffectOnce = func => useEffect(func, []);

const Dashboard = () => {

  const classes = useStyles();
  const [dashboard, setDashboard] = useRecoilState(dashboardAtom);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const pageCount = Math.ceil(dashboard.pagination.totalItems / 10);

  const search = async payload => {
    setDashboard({ ...dashboard, isLoading: true })
    const response = await api.post('/record/search', {
      ...payload,
      startDate: payload.startDate.format('YYYY-MM-DD HH:mm'),
      endDate: payload.endDate.format('YYYY-MM-DD HH:mm')
    });
    const stats = await api.post('/record/stats');
    if (response) {
      setDashboard({
        ...dashboard,
        init: true,
        isLoading: false,
        stats: stats.data,
        items: response.data.items,
        pagination: response.data.meta,
        startDate: payload.startDate,
        endDate: payload.endDate
      });
    } else {
      setDashboard({ ...dashboard, isLoading: false })
    }
  }

  useEffectOnce(() => {
    if (!dashboard.init) {
      search({
        page: dashboard.pagination.currentPage,
        limit: 10,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
      });
    }
    setStartDate(dashboard.startDate);
    setEndDate(dashboard.endDate);
  });

  const handlePagination = (e, page) => {
    search({
      page,
      limit: 10,
      startDate: dashboard.startDate,
      endDate: dashboard.endDate,
    });
  }

  const applyFilter = () => {
    search({
      page: 1,
      limit: 10,
      startDate,
      endDate
    });
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        {!dashboard.init?
          <div className={classes.empty}>
            <CircularProgress color="inherit" />
          </div> :
          <div className={classes.space}>
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <TopCard
                  title="Total Vehicles"
                  desc="all vehicles"
                  value={dashboard.stats.total}
                  color="indigo" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <TopCard
                  title="Student"
                  desc="students registered"
                  value={dashboard.stats.student}
                  color="success" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <TopCard
                  title="Faculty"
                  desc="faculties registered"
                  value={dashboard.stats.faculty}
                  color="info" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <TopCard
                  title="Unknown"
                  desc="unregistered"
                  value={dashboard.stats.unknown}
                  color="pink accent-2" />
              </div>
            </div>
            <Paper className={classes.filterCard}>
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
              <Button
                variant="contained"
                color="primary"
                onClick={applyFilter}
              >
                Apply
              </Button>
            </Paper>
            <Pagination
              classes={{ ul: classes.justifyCenter }}
              count={pageCount}
              page={dashboard.pagination.currentPage}
              onChange={handlePagination}
            />
            <Paper>
              <StatusBox
                height={100}
                status={dashboard.isLoading ? 'wait' : dashboard.items.length === 0 ? 'empty' : ''}
              >
                {dashboard.items.map(record =>
                  <StreamItem record={record} key={record.id} />
                )}
              </StatusBox>
            </Paper>
          </div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import dashboardAtom from "atoms/school/dashboard";
import { initAction } from "actions/school/dashboard";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StreamStatusBox from "components/school/StreamStatusBox";
import DataBox from "components/DataBox";
import RecordItem from "components/school/RecordItem";
import DashboardFilter from "components/school/DashboardFilter";

const useStyles = makeStyles({
  dateTimeBox: {
    width: 150,
  },
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  records: {
    padding: 16,
    '& > *+*' : {
      borderTop: '1px solid #e2e2e2',
      paddingTop: 16,
      marginTop: 16
    }
  },
  sample: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const useEffectOnce = func => useEffect(func, []);
const samples = [
  ['New Jersey', 50],
  ['New York', 50],
  ['Pennsylvania', 50],
];

const Dashboard = () => {

  const classes = useStyles();
  const dashboardState = useRecoilValue(dashboardAtom);
  const dashboardInit = useRecoilCallback(initAction);

  useEffectOnce(() => {
    dashboardInit();
  });

  return (
    <div className={classes.space}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>
          <div className={classes.space}>
            <StreamStatusBox
              title="Total Vehicles"
              color="#3f51b5"
              value={dashboardState.stats.total}
            />
            <StreamStatusBox
              title="Student"
              color="#2196f3"
              value={dashboardState.stats.student}
            />
            <StreamStatusBox
              title="Faculty"
              color="#43a047"
              value={dashboardState.stats.faculty}
            />
            <StreamStatusBox
              title="Unknown"
              color="#9e9e9e"
              value={dashboardState.stats.unknown}
            />
            <StreamStatusBox
              title="Out of State Visitors"
              color="#ff5722"
              value={130}
            >
              <div className={classes.space}>
                {samples.map((sample, index) =>
                  <div className={classes.sample} key={index}>
                    <span>{sample[0]}</span>
                    <span>{sample[1]}</span>
                  </div>
                )}
                <Button color="primary" variant="contained" size="small">
                  see all states
                </Button>
              </div>
            </StreamStatusBox>
          </div>
        </Grid>
        <Grid item xs={12} sm={10}>
          <DataBox
            height={300}
            loading={dashboardState.isLoading}
            empty={dashboardState.items.length === 0}
          >
            <div className={classes.records}>
              <DashboardFilter />
              {dashboardState.items.map(record =>
                <RecordItem record={record} to={`/dashboard/${record.id}`} key={record.id} />
              )}
            </div>
          </DataBox>
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.title = "Campus Dashboard";

export default Dashboard;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "api";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageBackLink from "components/PageBackLink";
import DataBox from "components/DataBox";
import RecordItem from "components/school/RecordItem";
import VisitHistory from "components/school/VisitHistory";
import FlagHistory from "components/school/FlagHistory";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  }
});

const DashboardRecord = () => {

  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState(null);

  useEffectOnce(() => {
    const load = async () => {
      const response = await api.post('/record/view', { id });
      if (response) {
        setRecord(response.data);
      }
      setIsLoading(false);
    };
    load();
  });

  return (
    <div className={classes.space}>
      <PageBackLink to="/dashboard">
        Dashboard
      </PageBackLink>
      <div className={classes.space}>
        <DataBox height={100} padding={16} loading={isLoading} empty={!record}>
          {record && <RecordItem record={record} noLink />}
        </DataBox>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>
              <DataBox height={100} loading={isLoading} empty={!record}>
                {record && record.visitHistory && <VisitHistory data={record.visitHistory} />}
              </DataBox>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <DataBox height={100} loading={isLoading} empty={!record}>
                {record && <FlagHistory record={record} />}
              </DataBox>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardRecord;
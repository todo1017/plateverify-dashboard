import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "api";
import { Paper, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from '@material-ui/icons/Check';
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
  },
  align: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const AlertRecord = () => {

  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [record, setRecord] = useState(null);

  useEffectOnce(() => {
    const load = async () => {
      setIsLoading(true);
      const response = await api.post('/record/view', { id });
      if (response) {
        setRecord(response.data);
      }
      setIsLoading(false);
    };
    load();
  });

  const handleCheck = async () => {
    if (record.alert !== 'checked') {
      setIsLoading(true);
      const response = await api.post('/alert/check', { id });
      if (response) {
        setRecord({
          ...record,
          alert: 'checked'
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.space}>
      <div className={classes.align}>
        <PageBackLink to="/alert">
          Alert
        </PageBackLink>
        {record &&
          <Button
            color="secondary"
            startIcon={<CheckIcon />}
            disabled={record.alert === 'checked'}
            onClick={handleCheck}
          >
            {record.alert === 'checked' ? 'checked' : 'check'}
          </Button>
        }
      </div>
      <div className={classes.space}>
        <DataBox height={100} padding={16} loading={isLoading} empty={!record}>
          {record && <RecordItem record={record} noLink />}
        </DataBox>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>
              <DataBox
                height={100}
                loading={isLoading}
                empty={!record}
              >
                {record && <VisitHistory data={record.visitHistory} />}
              </DataBox>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <DataBox
                height={100}
                loading={isLoading}
                empty={!record}
              >
                {record && <FlagHistory record={record} />}
              </DataBox>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AlertRecord;
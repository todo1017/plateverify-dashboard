import React, { useEffect } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import alertsAtom from "atoms/school/alerts";
import { initAction } from "actions/school/alerts";
import { makeStyles } from "@material-ui/core/styles";
import DataBox from "components/DataBox";
import RecordItem from "components/school/RecordItem";
import AlertFilter from "components/school/AlertFilter";

const useEffectOnce = func => useEffect(func, []);
const useStyles = makeStyles({
  records: {
    padding: 16,
    '& > *+*' : {
      borderTop: '1px solid #e2e2e2',
      paddingTop: 16,
      marginTop: 16
    }
  },
});

const AlertList = () => {
  const classes = useStyles();
  const alertsState = useRecoilValue(alertsAtom);
  const alertInit = useRecoilCallback(initAction);

  useEffectOnce(() => {
    alertInit();
  });

  return (
    <DataBox
      height={100}
      loading={alertsState.isLoading}
      empty={alertsState.records.length === 0}
    >
      {alertsState.init &&
        <div className={classes.records}>
          <AlertFilter />
          {alertsState.records.map(record =>
            <RecordItem record={record} to={`/alert/${record.id}`} key={record.id} />
          )}
        </div>
      }
    </DataBox>
  );
};

export default AlertList;

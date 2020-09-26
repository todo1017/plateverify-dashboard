import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import settingActions from "store/school/setting/actions";
import Alert from "./alert";

const useStyles = makeStyles({
  title: {
    fontSize: 24,
    padding: 16
  },
  getStarted: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  }
});

const useEffectOnce = func => useEffect(func, []);

const Setting = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const settingState = useSelector(state => state.School.Setting);
  const alert = settingState.settings.filter(setting => setting.category === 'alert')[0];

  useEffectOnce(() => {
    if (settingState.settings.length === 0) {
      dispatch(settingActions.get());
    }
  });

  const handleGetStarted = () => {
    dispatch(settingActions.start({
      category: 'alert'
    }));
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <Paper>
          <div className={classes.title}>
            Alert
          </div>
          {settingState.action === settingActions.GET_SUCCESS && alert === undefined &&
            <div className={classes.getStarted}>
              <Button color="primary" variant="contained" onClick={handleGetStarted}>
                Get started
              </Button>
            </div>
          }
          {alert && <Alert alert={alert} /> }
        </Paper>
      </div>
    </div>
  );
};

export default Setting;
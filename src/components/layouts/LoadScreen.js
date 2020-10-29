import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 80
  }
});

const LoadScreen = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default LoadScreen;
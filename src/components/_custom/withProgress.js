import React from "react";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(props => ({
  root: {
    width: '100%',
  }
}));

const WithProgress = (props) => {

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  )
};

export default WithProgress;
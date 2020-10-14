import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(props => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: props => props.height
  }
}));

const WaitBox = (props) => {

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
};

export default WaitBox;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row-reverse',
  }
});

const PageHead = ({ children }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      { children }
    </div>
  )
};

export default PageHead;
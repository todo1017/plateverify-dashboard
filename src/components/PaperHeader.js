import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
    padding: '0 16px',
    borderBottom: '1px solid #eee',
    color: '#3f51b5',
    fontSize: 18
  }
});

const PaperHeader = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
};

export default PaperHeader;
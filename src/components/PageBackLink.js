import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
  root: {
    textDecoration: 'none'
  },
  btn: {
    textTransform: 'none'
  }
});

const PageBackLink = ({ to, children }) => {

  const classes = useStyles();

  return (
    <Link to={to} className={classes.root}>
      <Button
        className={classes.btn}
        startIcon={<ArrowBackIcon />}
      >
        {children}
      </Button>
    </Link>
  )
};

export default PageBackLink;
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    textDecoration: 'none'
  },
  btn: {
    textTransform: 'none'
  }
});

const PageAddLink = ({ to, children }) => {

  const classes = useStyles();

  return (
    <Link to={to} className={classes.root}>
      <Button
        className={classes.btn}
        startIcon={<AddIcon />}
      >
        {children}
      </Button>
    </Link>
  )
};

export default PageAddLink;
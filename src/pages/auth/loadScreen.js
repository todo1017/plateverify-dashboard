import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 80
  },
  title: {
    fontSize: 32,
    marginTop: 32
  },
  company: {
    fontSize: 20,
    color: '#888'
  }
});

export default function SignIn() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.logo} src="/logo.png" alt="" />
      <div className={classes.title}>
        PLATEVERIFY
      </div>
      <div className={classes.company}>
        Perimeter Protection Technologies
      </div>
    </div>
  );
}

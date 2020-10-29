import React from "react";
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden'
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: props => props.color,
    color: 'white',
    '& > *+*': {
      marginTop: 8
    }
  },
  title: {
    fontSize: 14
  },
  value: {
    fontSize: 24
  },
  body: {
    backgroundColor: 'white',
    padding: 16
  }
});

const StreamStatusBox = ({ color, title, value, children, loading }) => {

  const classes = useStyles({ color });

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.heading}>
        <div className={classes.title}>
          {title}
        </div>
        {loading ?
          <CircularProgress color="inherit" size={24} /> :
          <div className={classes.value}>
            {value}
          </div>
        }
      </div>
      {children &&
        <div className={classes.body}>
          {children}
        </div>
      }
    </Paper>
  );
};

export default StreamStatusBox;
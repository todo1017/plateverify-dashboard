import React from "react";
import { Paper, LinearProgress } from "@material-ui/core";
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    minHeight: props => props.height,
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: props => props.height,
    color: '#CCC'
  },
  content: {
    padding: props => props.padding || 0
  }
});

const EmptyBox = ({ height, loading, empty, padding, children}) => {

  const classes = useStyles({ height, padding });

  return (
    <Paper className={classes.root} elevation={3}>
      {loading &&
        <LinearProgress style={{height: 2}}/>
      }
      <div className={classes.content}>
        {children}
      </div>
      {empty &&
        <div className={classes.empty}>
          <FilterNoneIcon />
        </div>
      }
    </Paper>
  )
};

export default EmptyBox;
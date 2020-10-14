import React from "react";
import { LinearProgress, CircularProgress } from "@material-ui/core";
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    position: 'relative',
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
    padding: props => props.padding
  }
});

const EmptyBox = ({ height, status, type='line', padding=16, children}) => {

  const classes = useStyles({ height, status, padding });

  return (
    <div className={classes.root}>
      {status === 'wait' && type === 'line' && <LinearProgress style={{height: 2}}/>}
      {status === 'wait' && type === 'circle' &&
        <div className={classes.empty}>
          <CircularProgress />
        </div>
      }
      {status === 'empty' &&
        <div className={classes.empty}>
          {status === 'empty' && <FilterNoneIcon />}
          {status === 'empty' && <span>No Data</span>}
        </div>
      }
      {(status !== 'empty' && (status !== 'wait' || type !== 'circle')) &&
        <div className={classes.content}>
          { children }
        </div>
      }
    </div>
  )
};

export default EmptyBox;
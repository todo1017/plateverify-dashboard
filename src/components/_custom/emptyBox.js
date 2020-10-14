import React from "react";
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: props => props.height,
    color: '#CCCCCC',
    '& > *+*': {
      marginTop: 8
    }
  }
});

const EmptyBox = (props) => {

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <FilterNoneIcon />
      <span>
        No Data
      </span>
    </div>
  )
};

export default EmptyBox;
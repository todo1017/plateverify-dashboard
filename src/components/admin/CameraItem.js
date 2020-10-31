import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    '& > span': {
      marginTop: 2
    },
    '& > .MuiIconButton-root': {
      color: '#999',
      marginLeft: 8
    }
  }
});

const CameraItem = ({ camera, onRemove, loading }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>{camera.name} / {camera.angle} / {camera.tolerance}</span>
      <IconButton disabled={loading} onClick={onRemove}>
        <CloseIcon size="small"/>
      </IconButton>
    </div>
  );
};

export default CameraItem;
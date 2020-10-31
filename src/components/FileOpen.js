import React from "react";
import { ButtonBase  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: '#616161',
    color: 'white',
    borderRadius: 4,
    padding: '8px 12px',
    '& > input' : {
      display: 'none'
    }
  }
});

const FileOpen = ({ onSelect, children, ...props }) => {

  const classes = useStyles();

  const handleChange = (e) => {
    onSelect(e.target.files[0]);
  };

  return (
    <ButtonBase className={classes.root} component="label" {...props}>
      {children || 'Open File'}
      <input type="file" onChange={handleChange}/>
    </ButtonBase>
  );
};

export default FileOpen;
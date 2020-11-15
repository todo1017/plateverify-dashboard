import React from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import cn from "classnames";
import FileOpen from "components/FileOpen";

const useStyles = makeStyles({
  root: {
    padding: 16,
    '& > *+*': {
      marginTop: 16
    },
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    '& > *+*': {
      marginLeft: 8
    },
    '&.active': {
      color: '#673ab7'
    }
  },
  running: {
    display: 'flex',
    alignItems: 'center',
    '& > *+*': {
      marginLeft: 8
    },
  }
});

const MigrationStep = ({ title, status, run, loading }) => {
  const classes = useStyles();

  const handleParse = async file => {
    if (file) {
      run(file);
    }
  };

  return (
    <React.Fragment>
      <Divider />
      <div className={classes.root}>
        <div className={cn(classes.head, {active:status === 'done'})}>
          {status === 'done' && <CheckCircleOutlineIcon /> }
          <span>{title}</span>
          {status === 'running' && <AutorenewIcon className="rotating" />}
        </div>
        {status !== 'running' && status !== 'done' && !loading && <FileOpen onSelect={handleParse} />}
      </div>
    </React.Fragment>
  );
};

export default MigrationStep;
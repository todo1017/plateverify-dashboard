import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button
} from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import PrivateLink from "components/link/private";

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});

const VehicleView = () => {

  const classes = useStyles();

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink roles={[]} to="/vehicle">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ListIcon />}>
              List
            </Button>
          </PrivateLink>
        </div>
        <Paper className={classes.root}>
        </Paper>
      </div>
    </div>
  );
};

export default VehicleView;
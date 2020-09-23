import React from "react";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DashboardIcon from '@material-ui/icons/Dashboard';
import classnames from "classnames";
import PrivateLink from "components/link/private";

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  card: {
    padding: 16
  },
  wrapper: {
    '& > *': {
      marginBottom: 16
    }
  },
  photo: {
    width: '100%',
    borderRadius: 4
  },
  visitorType: {

  }
});

const groupColor = {
  student: '#4caf50',
  faculty: '#2196f3',
  flagged: '#f44336',
  unknown: '#ffc107',
  register: '#e91e63',
};

const RecordView = () => {

  const classes = useStyles();

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink roles={[]} to="/dashboard">
            <Button
              color="primary"
              variant="contained"
              startIcon={<DashboardIcon />}>
              Dashboard
            </Button>
          </PrivateLink>
        </div>
        <Paper className={classes.card}>
          <div className={classnames('row', classes.wrapper)}>
            <div className="col-md-4 col-sm-12">
              <img className={classes.photo} src="/background.png" alt=""/>
            </div>
            <div className="col-md-8 col-sm-12">
              <div>
                <span className="jr-tag" style={{background: groupColor['student']}}>
                  STUDENT
                </span>
              </div>
              <div>John Doe</div>
              <div>
                <span className="jr-tag" style={{background: '#ff9800'}}>
                  ENTERING
                </span>
              </div>
              <div>
                Main Entrance, 08:30 09-23-20
              </div>
              <div>
                TYP1037
              </div>
              <div>
                toyota | sedan-compact | black
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div>Visit History</div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div>Flagged History</div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default RecordView;
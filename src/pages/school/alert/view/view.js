import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Paper, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckIcon from '@material-ui/icons/Check';
import * as moment from "moment";
import { useEffectOnlyOnce } from "util/custom";
import api from "containers/api";
import PageHead from "components/_custom/pageHead";
import StatusBox from "components/_custom/statusBox";
import VisitHistory from "./visitHistory";
import FlagHistory from "./flagHistory";

const useStyles = makeStyles({
  photo: {
    marginBottom: 16,
    overflow: 'hidden',
    '& .background': {
      position: 'relative',
      paddingBottom: '60%',
      '& .photo-container': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        '& img': {
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }
      }
    }
  },
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  card: {
    padding: 16,
    marginBottom: 16,
    height: 'calc(100% - 16px)'
  },
  flexGrow: {
    flexGrow: 1
  }
});

const groupColor = {
  student: '#4caf50',
  faculty: '#2196f3',
  flagged: '#f44336',
  offender: '#f44336',
  unknown: '#ffc107',
  register: '#e91e63',
};

const AlertView = () => {

  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [record, setRecord] = useState(null);

  useEffectOnlyOnce(() => {
    const load = async () => {
      setIsLoading(true);
      const response = await api.post('/record/view', { id });
      if (response) {
        setRecord(response.data);
      }
      setIsLoading(false);
    };
    load();
  });

  const handleCheck = async () => {
    if (!isChecking) {
      setIsChecking(true);
      const response = await api.post('/alert/check', { id });
      if (response) {
        setRecord({
          ...record,
          alert: 'checked'
        });
      }
      setIsChecking(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <PageHead>
          <Link to="/alert">
            <Button
              color="primary"
              variant="contained"
              startIcon={<NotificationsIcon />}
            >
              Alert
            </Button>
          </Link>
          <div className={classes.flexGrow}></div>
          {record &&
            <Button
            color="secondary"
            variant="contained"
            startIcon={isChecking? <CircularProgress color="inherit" size={16} /> :<CheckIcon />}
            disabled={record.alert === 'checked'}
            onClick={handleCheck}
            >
              Check
            </Button>
          }
        </PageHead>
        <StatusBox
          padding={0}
          height={200}
          type="circle"
          status={isLoading ? 'wait' : record === null ? 'empty' : ''}
        >
          {record &&
            <div>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-sm-12">
                  <Paper className={classes.photo} elevation={4}>
                    <div className="background">
                      <div className="photo-container">
                        <img className={classes.photo} src={record.meta.photo} alt=""/>
                      </div>
                    </div>
                  </Paper>
                </div>
                <div className="col-xl-9 col-lg-6 col-sm-12">
                  <Paper className={classes.card}>
                    <div className="row">
                      <div className="col-xl-3 col-md-6 col-sm-6">
                        <div>
                          <span className="jr-tag text-uppercase" style={{background: groupColor[record.meta.visitorType]}}>
                            {record.meta.visitorType}
                          </span>
                        </div>
                        <div className="mb-2">{record.meta.visitorName}</div>
                        <h3 className="text-uppercase mt-1 mb-1">{record.plate}</h3>
                        <div className="d-flex flex-wrap mb-2">
                          <p className="mr-1 mb-1 text-grey">{record.meta.vehicleMake}</p>
                          <p className="mr-1 mb-1 text-grey">| {record.meta.vehicleBodyType}</p>
                          <p className="mr-1 mb-1 text-grey">| {record.meta.vehicleColor}</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-6 col-sm-6">
                        <div>
                          <span className="jr-tag">
                            {record.meta.direction}
                          </span>
                        </div>
                        <h3 className="text-uppercase mt-1 mb-1">{record.meta.location}</h3>
                        <div>
                          {moment(record.created_at).format('hh:mm:ss MM/DD/YY')}
                        </div>
                      </div>
                    </div>
                  </Paper>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Paper className={classes.card}>
                    <b>Visit History</b>
                    <StatusBox
                      height={100}
                      status={record.visitHistory.length === 0 && 'empty'}
                    >
                      <VisitHistory data={record.visitHistory} />
                    </StatusBox>
                  </Paper>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Paper className={classes.card}>
                    <div className={classes.space}>
                      <b className="mr-4">Flagged History</b>
                      <StatusBox
                        height={100}
                        status={(!record.vehicle || record.vehicle.length === 0) && 'empty'}
                      >
                        {record.vehicle &&
                          <FlagHistory vehicle={record.vehicle} />
                        }
                      </StatusBox>
                    </div>
                  </Paper>
                </div>
              </div>
            </div>
          }
        </StatusBox>  
      </div>
    </div>
  );
};

export default AlertView;
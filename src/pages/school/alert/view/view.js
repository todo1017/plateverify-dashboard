import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import DashboardIcon from '@material-ui/icons/Dashboard';
import * as moment from "moment";
import PrivateLink from "components/link/private";
import recordActions from "store/school/record/actions";
import vehicleActions from "store/school/vehicle/actions";
import Visit from "./visit";
import Flag from "./flag";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
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
});

const groupColor = {
  student: '#4caf50',
  faculty: '#2196f3',
  flagged: '#f44336',
  offender: '#f44336',
  unknown: '#ffc107',
  register: '#e91e63',
};

const RecordView = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const recordState = useSelector(state => state.School.Record);
  const vehicleState = useSelector(state => state.School.Vehicle);
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffectOnce(() => {
    dispatch(recordActions.view({ id }));
  });

  useEffect(() => {
    setRecord(recordState.view);
  }, [recordState]);

  useEffect(() => {
    if (vehicleState.action === vehicleActions.FLAG_SUCCESS) {
      dispatch(recordActions.view({ id }));
    }
  }, [vehicleState, dispatch, id]);

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
        {recordState.action === recordActions.VIEW_FAILURE &&
          <Alert severity="error">No Record Exist!</Alert>
        }
        {recordState.action === recordActions.VIEW_SUCCESS && record &&
          <>
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
                  {record.visitHistory.length > 0 ?
                    <Visit records={record.visitHistory} /> :
                    <div className="p-4 text-center">NO HISTORY</div>
                  }
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                <Paper className={classes.card}>
                  <div className={classes.space}>
                    <b className="mr-4">Flagged History</b>
                    {record.vehicle && <Flag vehicle={record.vehicle} /> }
                  </div>
                </Paper>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default RecordView;
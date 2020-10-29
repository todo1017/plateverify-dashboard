import React from "react";
import { Link } from "react-router-dom";
import cm from "classnames";
import moment from "moment";
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  info: {
    display: 'flex',
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between'
  },
  to: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  photo: {
    borderRadius: 4,
    overflow: 'hidden',
    width: 200,
    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  student: {
    backgroundColor: '#2196f3'
  },
  faculty: {
    backgroundColor: '#43a047'
  },
  unknown: {
    backgroundColor: '#9e9e9e'
  },
  offender: {
    backgroundColor: '#e91e63'
  },
  flagged: {
    backgroundColor: '#e91e63'
  },
  visitorType: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: 'white',
    padding: 4,
    borderRadius: 2
  },
  visitorName: {
    fontSize: 18,
  },
  smallText: {
    fontSize: 12
  },
  plate: {
    color: 'grey',
    textTransform: 'uppercase'
  },
  greytext: {
    color: 'grey',
  },
  direction: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  space: {
    '& > *+*': {
      marginTop: 4
    }
  }
});

const RecordItem = ({ record, noLink, to }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.photo}>
        <img src={record.meta.photo} alt=""/>
      </div>
      <div className={classes.info}>
        <div className={classes.space}>
          <span className={cm(classes.visitorType, classes[record.meta.visitorType])}>
            {record.meta.visitorType}
          </span>
          <div className={classes.visitorName}>
            {record.meta.visitorName}
          </div>
          <div className={classes.plate}>
            {record.plate}
          </div>
          <div className={classes.smallText}>
            <span className={classes.greytext}>
              Vehicle:
            </span>
            <span>{record.meta.vehicleMake} {record.meta.vehicleBodyType}</span>
          </div>
          <div className={classes.smallText}>
            <span className={classes.greytext}>
              Color:
            </span>
            <span>{record.meta.vehicleColor}</span>
          </div>
        </div>
        <div className={cm(classes.space, classes.to)}>
          <div>
            <div className={classes.direction}>
              {record.meta.direction}
            </div>
            <div className={cm(classes.greytext, classes.smallText)}>
              {moment(record.created_at).format('MM/DD hh:mm A')} | {record.meta.location}
            </div>
          </div>
          {!noLink &&
            <div>
              <Link to={to}>
                <IconButton color="primary">
                  <ArrowForwardIcon />
                </IconButton>
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default RecordItem;
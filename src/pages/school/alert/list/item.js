import React from "react";
import PrivateLink from "components/link/private";
import { makeStyles } from "@material-ui/core/styles";
import * as moment from "moment";
import classnames from "classnames";

const useStyles = makeStyles({
  root: {
    '& .jr-featured-thumb' : {
      width: 175,
      background: '#666',
      borderRadius: 4,
      overflow: 'hidden'
    },
    '& img.rounded-lg' : {
      minHeight: 100
    }
  }
});

const groupColor = {
  student: '#4caf50',
  faculty: '#2196f3',
  unknown: '#ffc107',
  flagged: '#f44336',
  offender: '#f44336',
};

const Item = ({ alert }) => {

  const classes = useStyles();
  
  return (
    <div className={classnames('media', 'jr-featured-item', classes.root)}>

      {/* direction */}
      <div className="jr-featured-thumb">
        <img className="rounded-lg" src={alert.meta.photo} alt=""/>
      </div>

      <div className="media-body jr-featured-content">
        <div className="jr-featured-content-left">

          {/* visitor group */}
          <span
            className="jr-tag text-uppercase d-inline-block"
            style={{background: groupColor[alert.meta.visitorType]}}>
            {alert.meta.visitorType}
          </span>

          {/* visitor */}
          <div className="mb-2">{alert.meta.visitorName}</div>

          {/* plate */}
          <h3 className="mb-0 jr-font-weight-medium text-uppercase">{alert.meta.plate}</h3>

          {/* vehicle */}
          <div className="text-grey">
            {alert.meta.vehicleMake} | {alert.meta.vehicleBodyType} | {alert.meta.vehicleColor}
          </div>
        </div>

        {/* location */}
        <div className="jr-featured-content-right">
          <div>
            <span className="jr-tag">{alert.meta.direction}</span>
            <h2 className="mb-0">{alert.meta.location}</h2>
            <div className="text-grey">
              {moment(alert.created_at).format('hh:mm:ss MM/DD/YY')}
            </div>
          </div>
          <p className="text-primary mt-auto mb-0 pointer">
            <PrivateLink roles={[]} to={`/alert/${alert.id}`}>
              <span>Detail</span>
            </PrivateLink>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Item;
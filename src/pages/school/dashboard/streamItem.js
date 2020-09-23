import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import PrivateLink from "components/link/private";

// const useStyles = makeStyles({
//   timeInput: {
//     marginLeft: 8,
//     marginRight: 8,
//     width: 130,
//   },
// });

const groupColor = {
  student: '#4caf50',
  faculty: '#2196f3',
  flagged: '#f44336',
  unknown: '#ffc107',
  register: '#e91e63',
};

const StreamItem = ({ record }) => {

  // const classes = useStyles();
  
  return (
    <div className="media jr-featured-item">

      {/* direction */}
      <div className="jr-featured-thumb">
        <img className="rounded-lg" src={record.image} alt=""/>
        {record.direction === 'entering' && <span className="jr-tag">ENTERING</span>}
        {record.direction === 'exiting' && <span className="jr-tag">EXITING</span>}
      </div>

      <div className="media-body jr-featured-content">
        <div className="jr-featured-content-left">

          {/* visitor group */}
          <span
            className="jr-tag text-uppercase d-inline-block"
            style={{background: groupColor[record.group]}}>
            {record.group}
          </span>

          {/* location */}
          <h3 className="mb-1">{record.location}</h3>

          {/* vehicle */}
          <div className="d-flex flex-wrap mb-2">
            <p className="mr-1 mb-1 text-grey">| {record.vehicle.make}</p>
            <p className="mr-1 mb-1 text-grey">| {record.vehicle.body}</p>
            <p className="mr-1 mb-1 text-grey">| {record.vehicle.color}</p>
          </div>

          {/* time */}
          <div className="d-flex flex-row">
            <p className="text-grey mb-1">
              <i className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`}/>
              {record.time}
            </p>
          </div>
        </div>

        {/* plate */}
        <div className="jr-featured-content-right">
          <div>
            <h2 className="mb-0 jr-font-weight-medium">{record.plate}</h2>
            <p className="text-grey jr-fs-sm">{record.name}</p>
          </div>
          <p className="text-primary mt-auto mb-0 pointer">
            <PrivateLink roles={[]} to={`/record/${record.id}`}>
              <span>Detail</span>
            </PrivateLink>
          </p>
        </div>

      </div>
    </div>
  );
}

export default StreamItem;
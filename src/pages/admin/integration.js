import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
});

const Dashboard = () => {

  const classes = useStyles();

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        Hello
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
});

const OffenderImport = () => {

  const classes = useStyles();

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        Offender Import
      </div>
    </div>
  );
};

export default OffenderImport;
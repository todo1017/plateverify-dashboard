import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
});

const UserList = () => {

  const classes = useStyles();

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        User List
      </div>
    </div>
  );
};

export default UserList;
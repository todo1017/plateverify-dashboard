import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Backdrop } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import PrivateLink from "components/link/private";
import vehicleActions from "store/school/vehicle/actions";
import Plate from "./plate";
import Visit from "./visit";
import Flag from "./flag";
import VehicleMember from "./member";

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  backdrop: {
    zIndex: 100,
    color: '#fff',
  },
});

const useEffectOnce = func => useEffect(func, []);

const VehicleView = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const vehicleState = useSelector(state => state.School.Vehicle);
  const { id } = useParams();

  useEffectOnce(() => {
    dispatch(vehicleActions.view({ id }));
  });

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

        {vehicleState.view &&
          <>
            <Plate vehicle={vehicleState.view} />
            <Visit records={vehicleState.view.records} />
            <Flag vehicle={vehicleState.view} />
            <VehicleMember member={vehicleState.view.member} />
          </>
        }

        <Backdrop className={classes.backdrop} open={vehicleState.action === vehicleActions.VIEW_REQUEST}>
          <CircularProgress color="inherit" />
        </Backdrop>

      </div>
    </div>
  );
};

export default VehicleView;
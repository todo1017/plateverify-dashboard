import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button
} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PrivateLink from "components/link/private";
import vehicleActions from "store/school/vehicle/actions";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});

const VehicleList = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const vehicleState = useSelector(state => state.School.Vehicle);

  useEffectOnce(() => {
    if (vehicleState.vehicles.length === 0) {
      dispatch(vehicleActions.list({
        page: 1,
        limit: 10
      }));
    }
  });

  const handleChangePage = (e, page) => {
    dispatch(vehicleActions.list({
      page: page + 1,
      limit: 10
    }));
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink
            roles={['ROLE_MANAGE_ALL']}
            to="/vehicle/import">
            <Button
              color="primary"
              variant="contained"
              startIcon={<CloudUploadIcon />}>
              Import
            </Button>
          </PrivateLink>
        </div>
        <Paper className={classes.root}>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Plate</TableCell>
                  <TableCell>Make</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicleState.vehicles.map(vehicle =>
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.plate}</TableCell>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.body}</TableCell>
                    <TableCell>{vehicle.color}</TableCell>
                    <TableCell width={50}>
                      <PrivateLink roles={['ROLE_MANAGE_ALL']} to={`/vehicle/view/${vehicle.id}`}>
                        <Button variant="outlined" >
                          View
                        </Button>
                      </PrivateLink>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={vehicleState.pagination.totalItems}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              page={vehicleState.pagination.currentPage-1}
              onChangePage={handleChangePage}
            />
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default VehicleList;
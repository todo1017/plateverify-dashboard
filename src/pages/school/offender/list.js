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
  Paper
} from "@material-ui/core";
import offenderActions from "store/school/offender/actions";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});


const OffenderList = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const offenderState = useSelector(state => state.School.Offender);

  useEffectOnce(() => {
    if (offenderState.offenders.length === 0) {
      dispatch(offenderActions.list({
        page: 1,
        limit: 10
      }));
    }
  });

  const handleChangePage = (e, page) => {
    dispatch(offenderActions.list({
      page: page + 1,
      limit: 10
    }));
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <Paper className={classes.root}>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Plate</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Vehicle Make</TableCell>
                  <TableCell>Vehicle Model</TableCell>
                  <TableCell>Vehicle Color</TableCell>
                  <TableCell>Vehicle Year</TableCell>
                  <TableCell>Vehicle State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offenderState.offenders.map(offender =>
                  <TableRow key={offender.id}>
                    <TableCell>
                      <span className="text-uppercase">
                        {offender.plate}
                      </span>
                    </TableCell>
                    <TableCell>{offender.risk_level}</TableCell>
                    <TableCell>{offender.name}</TableCell>
                    <TableCell>{offender.address}</TableCell>
                    <TableCell>{offender.vehicle_make}</TableCell>
                    <TableCell>{offender.vehicle_model}</TableCell>
                    <TableCell>{offender.vehicle_color}</TableCell>
                    <TableCell>{offender.vehicle_year}</TableCell>
                    <TableCell>{offender.vehicle_state}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={offenderState.pagination.totalItems}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              page={offenderState.pagination.currentPage-1}
              onChangePage={handleChangePage}
            />
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default OffenderList;
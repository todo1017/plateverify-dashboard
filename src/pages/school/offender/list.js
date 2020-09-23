import React from "react";
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

const useStyles = makeStyles({
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});

const OffenderList = () => {

  const classes = useStyles();

  const handleChangePage = () => {
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
                <TableRow>
                  <TableCell>FDJ8941</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>andrew, albert</TableCell>
                  <TableCell>9 Coyne Dr, Haverstraw, New York10927</TableCell>
                  <TableCell>Honda</TableCell>
                  <TableCell>Pilot</TableCell>
                  <TableCell>Burgundy</TableCell>
                  <TableCell>2011</TableCell>
                  <TableCell>NY</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={100}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              page={6}
              onChangePage={handleChangePage}
            />
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default OffenderList;
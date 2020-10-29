import React, { useEffect } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import offendersAtom from "atoms/school/offenders";
import { initAction, paginateAction } from "actions/school/offenders";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core";
import DataBox from "components/DataBox";

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
  const offendersState = useRecoilValue(offendersAtom);
  const offendersInit = useRecoilCallback(initAction);
  const offendersPaginate = useRecoilCallback(paginateAction);

  useEffectOnce(() => {
    offendersInit();
  });

  const handleChangePage = (e, page) => {
    offendersPaginate(page + 1);
  };

  return (
    <DataBox
      height={100}
      loading={offendersState.isLoading}
      empty={offendersState.items.length === 0}
    >
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
            {offendersState.items.map(offender =>
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
          count={offendersState.pagination.totalItems}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
          page={offendersState.pagination.currentPage-1}
          onChangePage={handleChangePage}
        />
      </TableContainer>
    </DataBox>
  );
};

export default OffenderList;

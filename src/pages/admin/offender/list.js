import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import offenderAtom from "atoms/admin/offender";
import { initAction, paginateAction } from "actions/admin/offender";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core";
import DataBox from "components/DataBox";
import PageImportLink from "components/PageImportLink";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  uppercase: {
    textTransform: 'uppercase'
  }
});

const OffenderList = () => {

  const classes = useStyles();
  const offenderState = useRecoilValue(offenderAtom);
  const offenderInit = useRecoilCallback(initAction);
  const offenderPaginate = useRecoilCallback(paginateAction);

  useEffectOnce(() => {
    offenderInit();
  });

  const handleChangePage = (e, page) => {
    offenderPaginate(page + 1);
  };

  return (
    <div className={classes.space}>
      <PageImportLink to="/admin/offender/import">
        Import
      </PageImportLink>
      <DataBox
        height={100}
        loading={offenderState.isLoading}
        empty={offenderState.items.length === 0}
      >
        <TableContainer>
          <Table>
            <TableHead>
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
              {offenderState.items.map(offender =>
                <TableRow key={offender.id}>
                  <TableCell>
                    <span className={classes.uppercase}>
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
      </DataBox>
    </div>
  );
};

OffenderList.title = "Offender List";

export default OffenderList;
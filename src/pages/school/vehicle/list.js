import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilCallback } from "recoil";
import vehiclesAtom from "atoms/school/vehicles";
import { initAction, paginateAction } from "actions/school/vehicles";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PageImportLink from "components/PageImportLink";
import DataBox from "components/DataBox";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    '& > *+*': {
      marginLeft: 16
    }
  },
  link: {
    width: 50,
    padding: 0
  },
  upperCase: {
    textTransform: 'uppercase'
  }
});

const VehicleList = () => {

  const classes = useStyles();
  const vehiclesState = useRecoilValue(vehiclesAtom);
  const vehiclesInit = useRecoilCallback(initAction);
  const vehiclesPaginate = useRecoilCallback(paginateAction);

  useEffectOnce(() => {
    vehiclesInit();
  });

  const handleChangePage = (e, page) => vehiclesPaginate(page+1);

  return (
    <div className={classes.space}>
      <PageImportLink to="/vehicle/import">
        Import
      </PageImportLink>
      <DataBox
        height={100}
        loading={vehiclesState.isLoading}
        empty={vehiclesState.items.length === 0}
      >
        <div className={classes.filter}>
          <TablePagination
            component="div"
            count={vehiclesState.pagination.totalItems}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            page={vehiclesState.pagination.currentPage-1}
            onChangePage={handleChangePage}
          />
        </div>
        <TableContainer>
          <Table>
            <TableHead>
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
              {vehiclesState.items.map(vehicle =>
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <span className={classes.upperCase}>
                      {vehicle.plate}
                    </span>
                  </TableCell>
                  <TableCell>{vehicle.make}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.body}</TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell className={classes.link}>
                    <Link to={`/vehicle/view/${vehicle.id}`}>
                      <IconButton color="primary">
                        <ArrowForwardIcon size="small" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DataBox>
    </div>
  );
};

export default VehicleList;
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Button } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PageHead from "components/_custom/pageHead";
import StatusBox from "components/_custom/statusBox";
import api from "containers/api";
import vehicleListAtom from "atoms/vehicleList";
import { useEffectOnlyOnce } from "util/custom";

const useStyles = makeStyles({
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});

const VehicleList = () => {

  const classes = useStyles();
  const [vehicleList, setVehicleList] = useRecoilState(vehicleListAtom);

  const search = async payload => {
    setVehicleList({
      ...vehicleList,
      isLoading: true
    });
    const response = await api.post('/vehicle/list', payload);
    if (response) {
      setVehicleList({
        ...vehicleList,
        isLoading: false,
        init: true,
        items: response.data.items,
        pagination: response.data.meta
      });
    } else {
      setVehicleList({
        ...vehicleList,
        isLoading: false
      });
    }
  };

  useEffectOnlyOnce(() => {
    if (!vehicleList.init) {
      search({
        init: true,
        page: 1,
        limit: 10
      });
    }
  });

  const handleChangePage = (e, page) => {
    search({
      page: page + 1,
      limit: 10
    });
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <PageHead>
          <Link to="/vehicle/import">
            <Button
              color="primary"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Import
            </Button>
          </Link>
        </PageHead>
        <Paper>
          <StatusBox
            height={200}
            type="circle"
            status={vehicleList.isLoading ? 'wait' : vehicleList.items.length === 0 ? 'empty' : ''}
          >
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
                  {vehicleList.items.map(vehicle =>
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <span className="text-uppercase">
                          {vehicle.plate}
                        </span>
                      </TableCell>
                      <TableCell>{vehicle.make}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.body}</TableCell>
                      <TableCell>{vehicle.color}</TableCell>
                      <TableCell width={50}>
                        <Link to={`/vehicle/view/${vehicle.id}`}>
                          <Button variant="outlined" >
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={vehicleList.pagination.totalItems}
                rowsPerPage={10}
                rowsPerPageOptions={[10]}
                page={vehicleList.pagination.currentPage-1}
                onChangePage={handleChangePage}
              />
            </TableContainer>
          </StatusBox>
        </Paper>
      </div>
    </div>
  );
};

export default VehicleList;
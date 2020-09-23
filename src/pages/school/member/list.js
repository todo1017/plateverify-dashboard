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
  Paper,
  Button
} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SimpleMenu from "components/menu/simple";
import PrivateLink from "components/link/private";

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  filterTop: {
    padding: 16
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});

const MemberList = () => {

  const classes = useStyles();

  const handleChangePage = () => {
  };

  const handleChangeType = () => {};

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink
            roles={['ROLE_MANAGE_ALL']}
            to="/member/import">
            <Button
              color="primary"
              variant="contained"
              startIcon={<CloudUploadIcon />}>
              Import
            </Button>
          </PrivateLink>
        </div>
        <Paper className={classes.root}>
          <div className={classes.filterTop}>
            <SimpleMenu values={['All', 'Student', 'Faculty']} onChange={handleChangeType}/>
          </div>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Plate</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Extra</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Aaron Arroyo</TableCell>
                  <TableCell>AC96587</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>
                    <div>Grade: 0</div>
                  </TableCell>
                  <TableCell width={50}>
                    <PrivateLink roles={['ROLE_MANAGE_ALL']} to={`/member/view/abcd1234`}>
                      <Button variant="outlined" >
                        View
                      </Button>
                    </PrivateLink>
                  </TableCell>
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

export default MemberList;
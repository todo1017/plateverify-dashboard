import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // TablePagination,
  Paper,
  Button
} from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import PrivateLink from "components/link/private";

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

const MemberImport = () => {

  const classes = useStyles();

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.actionTop}>
          <PrivateLink roles={[]} to="/member">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ListIcon />}>
              List
            </Button>
          </PrivateLink>
        </div>
        <Paper className={classes.root}>
          {/* <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Plate</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Extra</TableCell>
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
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
        </Paper>
      </div>
    </div>
  );
};

export default MemberImport;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Button
} from "@material-ui/core";
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import AddIcon from '@material-ui/icons/Add';

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
  btnContainer: {
    padding: 16
  },
  head: {
    '& .MuiTableCell-head': {
      color: '#3f51b5 !important'
    }
  },
});

const Setting = () => {

  const classes = useStyles();

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <Paper className={classes.root}>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell width={200}></TableCell>
                  <TableCell>SMS-PD</TableCell>
                  <TableCell>Email-PD</TableCell>
                  <TableCell>SMS-FV</TableCell>
                  <TableCell>Email-FV</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <PhoneIphoneIcon />
                    203-998-1254
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    example@email.com
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked
                      // onChange={handleChange}
                      name="checkedA"
                      color="primary"/>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.btnContainer}>
            <Button color="primary" startIcon={<AddIcon />}>
              New Phone
            </Button>
            <Button color="primary" startIcon={<AddIcon />}>
              New Email
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Setting;
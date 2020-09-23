import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,  
  Button,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { DateRangePicker } from "react-date-range";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import moment from "moment";
import PrivateLink from "components/link/private";

const useStyles = makeStyles({
  header: {
    padding: 16,
    '& .MuiToggleButton-root.Mui-selected': {
      backgroundColor: '#424242',
      color: 'white'
    },
    '& > *+*': {
      marginLeft: 8
    }
  },
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
  alignCenter: {
    textAlign: 'center'
  }
});

const AlertList = () => {

  const classes = useStyles();
  const [scope, setScope] = useState('all');
  const [active, setActive] = useState('yes');
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChangeScope = (event, value) => {
    if (value) {
      setScope(value);
    }
  };

  const handleChangeActive= (event, value) => {
    if (value) {
      setActive(value);
    }
  };

  const handleSelectDate = (ranges) => {
    setDate(ranges.selection);
  }

  const openDatePicker = () => {
    setDatePicker(true);
  };

  const toggleDatePicker = () => {
    setDatePicker(!datePicker);
  };

  const apply = () => {
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <Paper>
          <div className={classes.header}>
            <ToggleButtonGroup
              size="small"
              value={active}
              onChange={handleChangeActive}
              exclusive>
              <ToggleButton value="yes">Active</ToggleButton>
              <ToggleButton value="no">Archived</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              size="small"
              value={scope}
              onChange={handleChangeScope}
              exclusive>
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="date">Date</ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" onClick={openDatePicker}>
              {moment(date.startDate).format('MM/DD/YYYY')}-
              {moment(date.endDate).format('MM/DD/YYYY')}
            </Button>
            <Button variant="contained" color="primary" onClick={apply}>
              Apply
            </Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Plate</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>a</TableCell>
                  <TableCell>b</TableCell>
                  <TableCell>c</TableCell>
                  <TableCell>d</TableCell>
                  <TableCell>e</TableCell>
                  <TableCell>
                    <PrivateLink roles={['ROLE_MANAGE_ALL']} to={`/alert/view/abcd1234`}>
                      <Button variant="outlined" >
                        View
                      </Button>
                    </PrivateLink>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Modal isOpen={datePicker} toggle={toggleDatePicker} className={classes.datePicker}>
          <ModalHeader toggle={toggleDatePicker}>
            Select Date
          </ModalHeader>
          <ModalBody className={classes.alignCenter}>
            <DateRangePicker ranges={[date]} onChange={handleSelectDate} />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default AlertList;
import React, { useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DateRangePicker } from "react-date-range";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import moment from "moment";
import TopCard from "./topCard";
import StreamItem from "./streamItem";


const useStyles = makeStyles({
  filterCard: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    '& > *+*': {
      marginLeft: 8
    },
    '& .MuiInputBase-root': {
      height: 36,
      fontSize: 14
    }
  },
  timeInput: {
    marginLeft: 8,
    marginRight: 8,
    width: 130,
  },
  streamItem: {
    marginTop: 16,
    padding: 16
  }
});

const Dashboard = () => {

  const classes = useStyles();
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

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

  const record = {
    id: 'ajdhlkj-dfhkajd-adhj',
    direction: 'entering',
    image: '/background.png',
    group: 'student',
    plate: 'ty1037',
    name: 'John Doe',
    location: 'Main Entrance',
    time: '08:30 9/23/20',
    vehicle: {
      make: 'toyota',
      body: 'sedan-compact',
      color: 'black'
    }
  };

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <TopCard
              title="Total Vehicles"
              desc="all vehicles"
              value="123"
              color="indigo" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <TopCard
              title="Student"
              desc="students registered"
              value="123"
              color="success" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <TopCard
              title="Faculty"
              desc="faculties registered"
              value="123"
              color="info" />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <TopCard
              title="Unknown"
              desc="unregistered"
              value="123"
              color="pink accent-2" />
          </div>
        </div>

        <Paper className={classes.filterCard}>
          <Button variant="outlined" onClick={openDatePicker}>
            {moment(date.startDate).format('MM/DD/YYYY')}-
            {moment(date.endDate).format('MM/DD/YYYY')}
          </Button>
          <TextField
            type="time"
            defaultValue="00:00"
            className={classes.timeInput}
            variant="outlined" />
          <TextField
            type="time"
            defaultValue="00:00"
            className={classes.timeInput}
            variant="outlined" />
          <Button variant="contained" color="primary" onClick={apply}>
            Apply
          </Button>
        </Paper>

        <Modal isOpen={datePicker} toggle={toggleDatePicker} className={classes.datePicker}>
          <ModalHeader toggle={toggleDatePicker}>
            Select Date
          </ModalHeader>
          <ModalBody className={classes.alignCenter}>
            <DateRangePicker ranges={[date]} onChange={handleSelectDate} />
          </ModalBody>
        </Modal>

        <Paper className={classes.streamItem}>
          <StreamItem record={record} />
          <StreamItem record={record} />
          <StreamItem record={record} />
        </Paper>
      </div>
    </div>
  );
};

export default Dashboard;
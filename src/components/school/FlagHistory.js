import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import * as moment from "moment";
import cm from "classnames";
import api from "api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Backdrop, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from '@material-ui/icons/Flag';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import MomentUtils from '@date-io/moment';
import PaperHeader from "components/PaperHeader";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  form: {
    padding: 32
  },
  fullWidth: {
    width: '100%'
  },
  tag: {
    fontSize: 12,
    textTransform: 'uppercase',
    padding: 4,
    borderRadius: 2,
    width: 60,
    textAlign: 'center'
  },
  active: {
    backgroundColor: '#e91e63',
    color: 'white'
  },
  expired: {
    backgroundColor: '#CCC',
    color: '#9e9e9e'
  },
  backdrop: {
    zIndex: 1000,
    color: '#fff',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const FlagHistory = ({ record, noHead }) => {
  
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const [vehicle, setVehicle] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVehicle(record.vehicle);
  }, [record]);

  const onSubmit = async data => {
    if (!isLoading) {
      setIsLoading(true);
      setFormOpen(false);
      const response = await api.post('/vehicle/flag', {
        id: vehicle.id,
        reason: data.reason,
        expire: data.expire.format('YYYY-MM-DD')
      });
      if (response) {
        setVehicle({
          ...vehicle,
          flags: response.data.flags,
          flagged: true
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!noHead &&
        <PaperHeader>
          Flag History
          {vehicle &&
            <IconButton
            disabled={isLoading}
            color="secondary"
            onClick={() => setFormOpen(true)}
            >
              <FlagIcon />
            </IconButton>
          }
        </PaperHeader>
      }
      {vehicle &&
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Duration</TableCell>
                <TableCell>Expire</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicle.flags.map((flag, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {moment(flag.start).format('MM/DD/YY')} - {flag.end && moment(flag.end).format('MM/DD/YY')}
                  </TableCell>
                  <TableCell>{flag.expire}</TableCell>
                  <TableCell>{flag.reason}</TableCell>
                  <TableCell>
                    {(index === 0 && vehicle.flagged) ?
                      <div className={cm(classes.tag, classes.active)}>
                        active
                      </div>:
                      <div className={cm(classes.tag, classes.expired)}>
                        expired
                      </div>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <Backdrop
        className={classes.backdrop}
        open={formOpen}
        onClick={() => {}}
      >
        <Paper className={classes.form}>
          <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              fullWidth
              variant="outlined"
              label="Reason"
              name="reason"
              defaultValue=""
              as={TextField}
              error={!!errors.reason}
              helperText={errors.reason && <span>This field is required</span>}
              control={control}
              rules={{ required: true }}
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Controller
                name="expire"
                as={DatePicker}
                className={classes.fullWidth}
                format="YYYY/MM/DD"
                defaultValue={moment().add(1, 'month')}
                inputVariant="outlined"
                animateYearScrolling
                control={control}
                rules={{ required: true }}
              />
            </MuiPickersUtilsProvider>
            <div className={classes.buttons}>
              <IconButton type="submit" color="secondary">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => setFormOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </form>
        </Paper>
      </Backdrop>
    </div>
  );
}

export default FlagHistory;
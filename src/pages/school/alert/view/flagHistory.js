import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Backdrop, Fade, TextField, CircularProgress } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from '@date-io/moment';
import { useForm, Controller } from "react-hook-form";
import * as moment from "moment";
import api from "containers/api";
import StatusBox from "components/_custom/statusBox";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 32
  },
  fullWidth: {
    width: '100%'
  }
});

const FlagHistory = ({ vehicle }) => {
  
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const [flags, setFlags] = useState([]);
  const [flagged, setFlagged] = useState(false);
  const [status, setStatus] = useState({
    form: false,
    isFlagging: false,
    isFailed: false,
  });

  useEffect(() => {
    setFlags(vehicle.flags);
    setFlagged(vehicle.flagged);
  }, [ vehicle ]);

  const onSubmit = async data => {
    if (!status.isFlagging) {
      setStatus({
        ...status,
        isFlagging: true
      });
      const response = await api.post('/vehicle/flag', {
        id: vehicle.id,
        reason: data.reason,
        expire: data.expire.format('YYYY-MM-DD')
      });
      if (response) {
        setStatus({
          ...status,
          form: false,
          isFailed: false,
          isFlagging: false
        });
        setFlags(response.data.flags);
        setFlagged(true);
      } else {
        setStatus({
          ...status,
          isFailed: true,
          isFlagging: false
        });
      }
    }
  };

  const openForm = () => {
    setStatus({
      ...status,
      form: true,
    });
  };

  const closeForm = () => {
    setStatus({
      ...status,
      form: false
    });
  };

  return (
    <div>
      <Button
        onClick={openForm}
        color="secondary"
        variant="contained"
        size="small"
      >
        Flag
      </Button>
      <StatusBox
        height={100}
        status={flags.length === 0 ? 'empty' : ''}
      >
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
              {flags.map((flag, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {moment(flag.start).format('MM/DD/YY')} - {flag.end && moment(flag.end).format('MM/DD/YY')}
                  </TableCell>
                  <TableCell>{flag.expire}</TableCell>
                  <TableCell>{flag.reason}</TableCell>
                  <TableCell>
                    {(index === 0 && flagged) ?
                      <span className="jr-tag" style={{background: '#c2185b'}}>
                        active
                      </span>:
                      <span className="jr-tag" style={{background: '#666666'}}>
                        expired
                      </span>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StatusBox>
      <Modal
        className={classes.modal}
        open={status.form}
        onClose={closeForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 100 }}
      >
        <Fade in={status.form}>
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
                <label>Expire At:</label>
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
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                type="submit"
                startIcon={status.isFlagging && <CircularProgress color="inherit" size={16} />}
              >
                Flag
              </Button>
            </form>
          </Paper>
        </Fade>
      </Modal>

    </div>
  );
}

export default FlagHistory;
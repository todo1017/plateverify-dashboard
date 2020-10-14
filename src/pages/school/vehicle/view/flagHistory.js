import React, { useState } from 'react';
import * as moment from "moment";
import { useRecoilState } from "recoil";
import { useForm, Controller } from "react-hook-form";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Backdrop, Fade, TextField, CircularProgress } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from '@date-io/moment';
import vehicleViewAtom from "atoms/vehicleView";
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
  padding: {
    padding: 16
  },
  fullWidth: {
    width: '100%'
  }
});

const FlagHistory = ()  => {
  
  const classes = useStyles();
  const { control, handleSubmit, errors, reset } = useForm();
  const [vehicleView, setVehicleView] = useRecoilState(vehicleViewAtom);
  const [formOpen, setFormOpen] = useState(false);
  const onSubmit = async data => {
    setVehicleView({
      ...vehicleView,
      isUpdating: true
    });
    const response = await api.post('/vehicle/flag', {
      id: vehicleView.data.id,
      reason: data.reason,
      expire: data.expire.format('YYYY-MM-DD')
    });
    if (response) {
      setVehicleView({
        ...vehicleView,
        data: {
          ...vehicleView.data,
          flagged: response.data.flagged,
          flags: response.data.flags
        },
        isUpdating: false
      });
      reset();
      setFormOpen(false);
    } else {
      setVehicleView({
        ...vehicleView,
        isUpdating: false
      });
    }
  };

  // useEffect(() => {
  //   if (vehicleState.action === vehicleActions.FLAG_SUCCESS) {
  //     dispatch(vehicleActions.view({ id: vehicle.id }));
  //   }
  // }, [vehicleState, dispatch, vehicle]);

  // const formik = useFormik({
  //   initialValues: {
  //     reason: '',
  //     expire: moment().add(1, 'months'),
  //   },
  //   validationSchema,
  //   onSubmit: values => {
  //     dispatch(vehicleActions.flag({
  //       id: vehicle.id,
  //       reason: values.reason,
  //       expire: values.expire.format('YYYY-MM-DD')
  //     }));
  //     setForm(false);
  //     formik.setFieldTouched('reason', false);
  //     formik.setFieldValue('reason', '');
  //   }
  // });

  // const setExpireDate = (date) => {
  //   formik.setFieldValue('expire', date);
  // }

  return (
    <div>
      <Button
        onClick={() => setFormOpen(true)}
        color="secondary"
        variant="contained"
        size="small"
      >
        Flag
      </Button>
      <StatusBox height={100} status={vehicleView.data.flags.length === 0 ? 'empty' : ''}>
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
              {vehicleView.data.flags.map((flag, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {flag.start} - {flag.end || ''}
                  </TableCell>
                  <TableCell>{flag.expire}</TableCell>
                  <TableCell>{flag.reason}</TableCell>
                  <TableCell>
                    {(index === 0 && vehicleView.data.flagged) ?
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
        open={formOpen}
        onClose={() => setFormOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 100 }}
      >
        <Fade in={formOpen}>
          <Paper className={classes.padding}>
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
                startIcon={vehicleView.isUpdating && <CircularProgress color="inherit" size={16} />}
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
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Backdrop, Fade } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import MomentUtils from '@date-io/moment';
import { useFormik } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import FormikInput from "components/formik/formikInput";
import vehicleActions from "store/school/vehicle/actions";

const validationSchema = Yup.object().shape({
  reason: Yup.string().required('Required'),
});

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

export default function Flag({ vehicle }) {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const vehicleState = useSelector(state => state.School.Vehicle);
  const [form, setForm] = useState(false);

  useEffect(() => {
    if (vehicleState.action === vehicleActions.FLAG_SUCCESS) {
      dispatch(vehicleActions.view({ id: vehicle.id }));
    }
  }, [vehicleState, dispatch, vehicle]);

  const formik = useFormik({
    initialValues: {
      reason: '',
      expire: moment().add(1, 'months'),
    },
    validationSchema,
    onSubmit: values => {
      dispatch(vehicleActions.flag({
        id: vehicle.id,
        reason: values.reason,
        expire: values.expire.format('YYYY-MM-DD')
      }));
      setForm(false);
      formik.setFieldTouched('reason', false);
      formik.setFieldValue('reason', '');
    }
  });

  const setExpireDate = (date) => {
    formik.setFieldValue('expire', date);
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Flag History
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex-fill">
          <Button
            onClick={() => setForm(true)}
            color="secondary"
            variant="contained"
            size="small">
            Flag
          </Button>

          {vehicle.flags.length > 0 ?
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
                        {flag.start} - {flag.end || ''}
                      </TableCell>
                      <TableCell>{flag.expire}</TableCell>
                      <TableCell>{flag.reason}</TableCell>
                      <TableCell>
                        {(index === 0 && vehicle.flagged) ?
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
            </TableContainer> :
            <div className="p-4 text-center">NO FLAG</div>
          }

          <Modal
            className={classes.modal}
            open={form}
            onClose={() => setForm(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 100 }}>
            <Fade in={form}>
              <Paper className={classes.form}>
                <div className={classes.space}>
                  <label>Reason:</label>
                  <FormikInput formik={formik} name="reason" size="medium"/>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <label>Expire Date:</label>
                    <DatePicker
                      className={classes.fullWidth}
                      format="yyyy/MM/DD"
                      inputVariant="outlined"
                      value={formik.values.expire}
                      onChange={setExpireDate}
                      animateYearScrolling />
                  </MuiPickersUtilsProvider>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={formik.submitForm}>
                    Flag
                  </Button>
                </div>
              </Paper>
            </Fade>
          </Modal>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

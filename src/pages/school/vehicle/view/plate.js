import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionSummary, AccordionDetails, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from "components/formik/formikInput";
import vehicleActions from "store/school/vehicle/actions";

const useStyles = makeStyles({
  head: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  space: {
    flex: 1,
    '& > *+*': {
      marginTop: 16
    }
  },
});

const validationSchema = Yup.object().shape({
  make  : Yup.string().required('Required'),
  model : Yup.string().required('Required'),
  body  : Yup.string().required('Required'),
  color : Yup.string().required('Required'),
});

const useEffectOnce = func => useEffect(func, []);

const Plate = ({ vehicle }) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      make: '',
      model: '',
      body: '',
      color: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(vehicleActions.update({
        id: vehicle.id,
        ...values
      }));
    }
  });

  useEffectOnce(() => {
    formik.values.model = vehicle.model;
    formik.values.body  = vehicle.body;
    formik.values.color = vehicle.color;
    formik.setFieldValue('make', vehicle.make);
  });

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.head}>
          {vehicle.plate}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.space}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className={classes.space}>
                <FormikInput formik={formik} name="make" label="Make" variant="outlined" fullWidth />
                <FormikInput formik={formik} name="model" label="Model" variant="outlined" fullWidth />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className={classes.space}>
                <FormikInput formik={formik} name="body" label="Body Type" variant="outlined" fullWidth />
                <FormikInput formik={formik} name="color" label="Color" variant="outlined" fullWidth />
              </div>
            </div>
          </div>
          <Button variant="contained" color="primary" onClick={formik.submitForm}>
            Update
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Plate;
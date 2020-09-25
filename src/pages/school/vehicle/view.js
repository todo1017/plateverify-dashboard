import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionSummary, AccordionDetails, Button } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import PrivateLink from "components/link/private";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from "components/formik/formikInput";
import vehicleActions from "store/school/vehicle/actions";

const useStyles = makeStyles({
  actionTop: {
    marginBottom: 16,
    textAlign: 'right',
    '& > *+*': {
      marginLeft: 8
    }
  },
  head: {
    color: '#3f51b5',
    fontSize: 18
  },
  space: {
    flex: 1,
    '& > *+*': {
      marginTop: 16
    }
  }
});

const validationSchema = Yup.object().shape({
  make: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  body: Yup.string().required('Required'),
  color: Yup.string().required('Required'),
});

const useEffectOnce = func => useEffect(func, []);

const VehicleView = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const vehicleState = useSelector(state => state.School.Vehicle);
  const { id } = useParams();
  const [init, setInit] = useState(false);

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
        id,
        ...values
      }));
    }
  });

  useEffectOnce(() => {
    dispatch(vehicleActions.view({ id }));
  });

  useEffect(() => {
    if (!init && vehicleState.view && vehicleState.view.id === id) {
      formik.values.make = vehicleState.view.make;
      formik.values.model = vehicleState.view.model;
      formik.values.body = vehicleState.view.body;
      formik.values.color = vehicleState.view.color;
      setInit(true);
    }
  }, [vehicleState, formik, id, init]);

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">

        <div className={classes.actionTop}>
          <PrivateLink roles={[]} to="/vehicle">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ListIcon />}>
              List
            </Button>
          </PrivateLink>
        </div>

        {vehicleState.view &&
          <>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.head}>
                  {vehicleState.view.plate}
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
                  <Button variant="outlined" color="primary" onClick={formik.submitForm}>
                    Update
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        }

      </div>
    </div>
  );
};

export default VehicleView;
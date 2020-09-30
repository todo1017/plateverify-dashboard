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
import FormikSelect from "components/formik/formikSelect";
import memberActions from "store/school/member/actions";

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
    '& > *+*': {
      marginTop: 16
    }
  }
});

const validationSchema = Yup.object().shape({
  group: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  grade: Yup.string().required('Required'),
  graduation: Yup.string().required('Required'),
});

const useEffectOnce = func => useEffect(func, []);

const MemberView = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const memberState = useSelector(state => state.School.Member);
  const { id } = useParams();
  const [init, setInit] = useState(false);

  const formik = useFormik({
    initialValues: {
      group: '',
      first_name: '',
      last_name: '',
      address: '',
      email: '',
      phone: '',
      grade: '',
      graduation: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(memberActions.update({
        id,
        ...values
      }));
    }
  });

  useEffectOnce(() => {
    dispatch(memberActions.view({ id }));
  });

  useEffect(() => {
    if (!init && memberState.view && memberState.view.id === id) {
      formik.values.group = memberState.view.group;
      formik.values.first_name = memberState.view.first_name;
      formik.values.last_name = memberState.view.last_name;
      formik.values.address = memberState.view.address;
      formik.values.email = memberState.view.email;
      formik.values.phone = memberState.view.phone;
      formik.values.grade = memberState.view.grade;
      formik.values.graduation = memberState.view.graduation;
      setInit(true);
    }
  }, [memberState, formik, id, init]);

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

        {memberState.view &&
          <>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.head}>
                  {memberState.view.first_name} {memberState.view.last_name}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.space}>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className={classes.space}>
                        <FormikSelect formik={formik} options={['student', 'faculty']} name="group" label="Group" />
                        <FormikInput formik={formik} name="first_name" label="First Name" variant="outlined" fullWidth />
                        <FormikInput formik={formik} name="last_name" label="Last Name" variant="outlined" fullWidth />
                        <FormikInput formik={formik} name="address" label="Address" variant="outlined" fullWidth />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className={classes.space}>
                        <FormikInput formik={formik} name="email" label="Email" variant="outlined" fullWidth />
                        <FormikInput formik={formik} name="phone" label="Phone" variant="outlined" fullWidth />
                        <FormikInput formik={formik} name="grade" label="Grade" variant="outlined" fullWidth />
                        <FormikInput formik={formik} name="graduation" label="Graduation" variant="outlined" fullWidth />
                      </div>
                    </div>
                  </div>
                  <Button variant="outlined" color="primary" onClick={formik.submitForm}>
                    Update
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.head}>
                  Vehicles
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.space}>
                  {memberState.view.vehicles.map(vehicle =>
                    <PrivateLink roles={[]} to={`/vehicle/view/${vehicle.id}`} key={vehicle.id}>
                      <div className="text-uppercase">{vehicle.plate}</div>
                    </PrivateLink>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        }

      </div>
    </div>
  );
};

export default MemberView;
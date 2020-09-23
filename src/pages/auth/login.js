import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import authAction from "store/auth/actions";
import FormikInput from "components/formik/formikInput";

const useStyles = makeStyles(theme  => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    background: 'url("/background.png") no-repeat center center',
    backgroundSize: 'cover',
    '&:before' : {
      content: '',
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 'inherit',
      right: 0
    }
  },
  block: {
    maxWidth: 400,
    height: '100%',
    padding: '70px 50px',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  topSection: {
    marginBottom: 50,
    textAlign: 'center'
  },
  logoImg: {
    width: 80
  },
  title: {
    fontSize: 24,
    marginTop: 24,
  },
  company: {
    fontSize: 18,
    color: '#888'
  },
  space: {
    '& > *+*' : {
      marginTop: 20
    }
  },
  center: {
    textAlign: 'center'
  }
}));

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.Auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(authAction.verifyLogin(values));
    }
  });

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <div className={classes.topSection}>
          <img className={classes.logoImg} src="/logo.png" alt="" />
          <div className={classes.title}>
            PLATEVERIFY
          </div>
          <div className={classes.company}>
            Perimeter Protection Technologies
          </div>
        </div>
        <form className={classes.space} onSubmit={formik.handleSubmit}>
          <FormikInput
            formik={formik}
            name="email"
            label="Email"
            variant="outlined"
            fullWidth />
          <FormikInput
            formik={formik}
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth />
          <Button
            disabled={authState.action === authAction.TOKEN_REQUEST}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

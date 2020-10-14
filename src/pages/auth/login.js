import React from "react";
import { useRecoilState } from "recoil";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import authState from "atoms/auth";
import api from "containers/api";

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

const Login = () => {

  const classes = useStyles();
  const [auth, setAuth] = useRecoilState(authState);
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    setAuth({ ...auth, loginChecking: true });
    const response = await api.post('/auth/login', data);
    setAuth({ ...auth, loginChecking: false });
    if (response) {
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    }
  };

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
        <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            defaultValue=""
            as={TextField}
            error={!!errors.email}
            helperText={errors.email && <span>This field is required</span>}
            control={control}
            rules={{ required: true }}
          />
          <Controller
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            defaultValue=""
            as={TextField}
            error={!!errors.password}
            helperText={errors.password && <span>This field is required</span>}
            control={control}
            rules={{ required: true }}
          />
          <Button
            disabled={auth.loginChecking}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

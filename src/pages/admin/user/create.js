import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRecoilValue, useRecoilCallback } from "recoil";
import schoolAtom from "atoms/admin/school";
import { initAction as initSchoolAction } from "actions/admin/school";
import { addAction } from "actions/admin/user";
import api from "api";
import { Button, TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DataBox from "components/DataBox";
import PageBackLink from "components/PageBackLink";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  form: {
    padding: 16
  }
});

const adminScope = 'ROLE_SCOPE_PLATEVERIFY';
const schoolScope = 'ROLE_SCOPE_SCHOOL';

const useEffectOnce = func => useEffect(func, []);

const UserCreate = () => {

  const classes = useStyles();
  const schoolState = useRecoilValue(schoolAtom);
  const schoolInit = useRecoilCallback(initSchoolAction);
  const addUser = useRecoilCallback(addAction);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors, reset } = useForm();

  useEffectOnce(() => {
    schoolInit();
  });

  const onSubmit = async data => {
    const { name, email, password, employ } = data;
    setIsLoading(true);
    const response = await api.post('/user/new', {
      name,
      email,
      password,
      roles: employ === 'admin' ? [adminScope] : [schoolScope],
      schoolId: employ === 'admin' ? null : employ
    });
    if (response) {
      addUser(response.data);
      reset();
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.space}>
      <PageBackLink to="/admin/user">
        Users
      </PageBackLink>
      <DataBox
        height={100}
        loading={schoolState.isLoading || isLoading}
      >
        {!schoolState.isLoading &&
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.space}>
              <Controller
                fullWidth
                variant="outlined"
                label="Name"
                name="name"
                defaultValue=""
                as={TextField}
                control={control}
                error={!!errors.name}
                helperText={errors.name && <span>This field is required</span>}
                rules={{ required: true }}
              />
              <Controller
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                defaultValue=""
                as={TextField}
                control={control}
                error={!!errors.email}
                helperText={errors.email && <span>This field is required</span>}
                rules={{ required: true }}
              />
              <Controller
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                defaultValue=""
                as={TextField}
                control={control}
                error={!!errors.password}
                helperText={errors.password && <span>This field is required</span>}
                rules={{ required: true }}
              />
              <Controller
                fullWidth
                select
                variant="outlined"
                label="Employ"
                name="employ"
                defaultValue="admin"
                as={TextField}
                control={control}
                error={!!errors.employ}
                helperText={errors.employ && <span>This field is required</span>}
                rules={{ required: true }}
              >
                <MenuItem value="admin">ADMIN</MenuItem>
                {schoolState.data.map(school => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Controller>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isLoading}
              >
                Register
              </Button>
            </div>
          </form>
        }
      </DataBox>
    </div>
  );
};

UserCreate.title = "Register New User";

export default UserCreate;
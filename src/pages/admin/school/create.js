import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRecoilCallback } from "recoil";
import { addAction } from "actions/admin/school";
import api from "api";
import { TextField, Button } from "@material-ui/core";
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

const SchoolCreate = () => {

  const classes = useStyles();
  const addSchool = useRecoilCallback(addAction);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors, reset } = useForm();

  const onSubmit = async data => {
    setIsLoading(true);
    const response = await api.post('/school/new', data);
    if (response) {
      addSchool(response.data);
      reset();
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.space}>
      <PageBackLink to="/admin/school">
        Schools
      </PageBackLink>
      <DataBox height={100} loading={isLoading}>
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
              label="Live"
              name="live"
              defaultValue=""
              as={TextField}
              control={control}
              error={!!errors.live}
              helperText={errors.live && <span>This field is required</span>}
              rules={{ required: true }}
            />
            <Controller
              fullWidth
              variant="outlined"
              label="Timezone"
              name="timezone"
              type="number"
              defaultValue="-4"
              inputProps={{
                min: -12,
                max: 12
              }}
              as={TextField}
              control={control}
              error={!!errors.timezone}
              helperText={errors.timezone && <span>This field is required</span>}
              rules={{ required: true }}
            />
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DataBox>
    </div>
  );
};

SchoolCreate.title = "Add New School";

export default SchoolCreate;
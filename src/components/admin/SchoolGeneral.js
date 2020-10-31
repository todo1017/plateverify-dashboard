import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  }
});

const SchoolGeneral = ({ school, loading, onUpdate }) => {

  const classes = useStyles();
  const { control, handleSubmit, errors, watch } = useForm();
  const [canUpdate, setCanUpdate] = useState(false);
  const name = watch('name');
  const live = watch('live');
  const timezone = watch('timezone');

  useEffect(() => {
    let changed = false;
    changed = school.name !== name || changed;
    changed = school.live !== live || changed;
    changed = parseInt(school.timezone) !== parseInt(timezone) || changed;
    setCanUpdate(changed);
  }, [school, name, live, timezone]);

  const onSubmit = async data => {
    onUpdate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.space}>
        <Controller
          fullWidth
          variant="outlined"
          label="Name"
          name="name"
          size="small"
          disabled={loading}
          defaultValue={school.name}
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
          size="small"
          disabled={loading}
          defaultValue={school.live}
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
          size="small"
          type="number"
          disabled={loading}
          defaultValue={school.timezone}
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
        {canUpdate &&
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={loading}
          >
            Update
          </Button>
        }
      </div>
    </form>
  );
};

export default SchoolGeneral;
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, IconButton, Paper, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: '#673ab7',
    fontSize: 16,
    '& > span': {
      marginTop: 2
    },
    '& > .MuiIconButton-root': {
      color: '#673ab7',
      marginLeft: 8
    }
  },
  backdrop: {
    zIndex: 1000,
    color: '#fff',
  },
  form: {
    padding: 16,
    '& > *+*': {
      marginTop: 16
    }
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *+*': {
      marginLeft: 16
    }
  }
});

const CameraHead = ({ loading, onCreate }) => {

  const classes = useStyles();
  const { control, handleSubmit, errors, reset } = useForm();
  const [formOpen, setFormOpen] = useState(false);

  const onSubmit = async data => {
    setFormOpen(false);
    onCreate(data);
    reset();
  };

  return (
    <div className={classes.root}>
      <span>Name / Angle / Tolerance</span>
      <IconButton disabled={loading} onClick={() => setFormOpen(true)}>
        <AddIcon size="small"/>
      </IconButton>
      <Backdrop className={classes.backdrop} open={formOpen}>
        <Paper>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              fullWidth
              variant="outlined"
              label="Camera Name"
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
              label="Angle"
              name="angle"
              size="small"
              type="number"
              defaultValue={180}
              inputProps={{ min: 1, max: 360 }}
              as={TextField}
              control={control}
              error={!!errors.angle}
              helperText={errors.angle && <span>This field is required</span>}
              rules={{ required: true }}
            />
            <Controller
              fullWidth
              variant="outlined"
              label="Tolerance"
              name="tolerance"
              size="small"
              type="number"
              defaultValue={180}
              inputProps={{ min: 10, max: 180 }}
              as={TextField}
              control={control}
              error={!!errors.tolerance}
              helperText={errors.tolerance && <span>This field is required</span>}
              rules={{ required: true }}
            />
            <div className={classes.buttons}>
              <IconButton type="submit" color="primary">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => setFormOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </form>
        </Paper>
      </Backdrop>
    </div>
  );
};

export default CameraHead;
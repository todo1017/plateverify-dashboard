import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRecoilState } from "recoil";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import vehicleViewAtom from "atoms/vehicleView";
import api from "containers/api";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
});

const VehicleInfo = () => {

  const classes = useStyles();
  const [vehicleView, setVehicleView] = useRecoilState(vehicleViewAtom);
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    setVehicleView({...vehicleView, isUpdating: true});
    const response = await api.post('/vehicle/update', {
      id: vehicleView.data.id,
      ...data
    });
    if (response) {
      console.log(response);
      setVehicleView({
        ...vehicleView,
        data: response.data,
        isUpdating: false
      });
    } else {
      setVehicleView({
        ...vehicleView,
        isUpdating: false
      });
    }
  };

  return (
    <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        fullWidth
        variant="outlined"
        size="small"
        label="Make"
        name="make"
        as={TextField}
        defaultValue={vehicleView.data.make}
        error={!!errors.make}
        helperText={errors.make && <span>This field is required</span>}
        control={control}
        rules={{ required: true }}
      />
      <Controller
        fullWidth
        variant="outlined"
        size="small"
        label="Model"
        name="model"
        as={TextField}
        defaultValue={vehicleView.data.model}
        error={!!errors.model}
        helperText={errors.model && <span>This field is required</span>}
        control={control}
        rules={{ required: true }}
      />
      <Controller
        fullWidth
        variant="outlined"
        size="small"
        label="Body"
        name="body"
        as={TextField}
        defaultValue={vehicleView.data.body}
        error={!!errors.body}
        helperText={errors.body && <span>This field is required</span>}
        control={control}
        rules={{ required: true }}
      />
      <Controller
        fullWidth
        variant="outlined"
        size="small"
        label="Color"
        name="color"
        as={TextField}
        defaultValue={vehicleView.data.color}
        error={!!errors.color}
        helperText={errors.color && <span>This field is required</span>}
        control={control}
        rules={{ required: true }}
      />
      <Button
        disabled={vehicleView.isUpdating}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        size="large"
      >
        update
      </Button>
    </form>
  );
};

export default VehicleInfo;
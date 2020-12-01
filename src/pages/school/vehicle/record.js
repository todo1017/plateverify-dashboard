import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useRecoilCallback } from "recoil";
import { updateFieldsAction } from "actions/school/vehicles";
import api from "api";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import PageBackLink from "components/PageBackLink";
import { Accordian, AccordianItem, AccordianHead, AccordianBody } from "components/Accordian";
import DataBox from "components/DataBox";
import VisitHistory from "components/school/VisitHistory";
import FlagHistory from "components/school/FlagHistory";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  uppercase: {
    textTransform: 'uppercase'
  },

});

const FormText = ({ vehicle, errors, name, ...props }) => (
  <Controller
    fullWidth
    variant="outlined"
    size="small"
    name={name}
    as={TextField}
    defaultValue={vehicle[name]}
    error={!!errors[name]}
    helperText={errors[name] && <span>This field is required</span>}
    rules={{ required: true }}
    {...props}
  />
);

const VehicleRecord = () => {

  const classes = useStyles();
  const { id } = useParams();
  const vehiclesUpdateFields = useRecoilCallback(updateFieldsAction);
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  useEffectOnce(() => {
    const load = async () => {
      setIsLoading(true);
      const response = await api.post('/vehicle/view', { id });
      if (response) {
        setVehicle(response.data);
      }
      setIsLoading(false);
    };
    load();
  });

  const onSubmit = async data => {
    setIsLoading(true);
    const response = await api.post('/vehicle/update', { id, ...data });
    if (response) {
      setVehicle(response.data);
      vehiclesUpdateFields(vehicle, response.data);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.space}>
      <PageBackLink to="/vehicle">
        Vehicles
      </PageBackLink>
      <DataBox height={100} loading={isLoading}>
        <Accordian>
          <AccordianItem>
            <AccordianHead>
              Vehicle Information
            </AccordianHead>
            <AccordianBody>
              {vehicle &&
                <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
                  <FormText vehicle={vehicle} errors={errors} control={control} label="Make" name="make" />
                  <FormText vehicle={vehicle} errors={errors} control={control} label="Model" name="model" />
                  <FormText vehicle={vehicle} errors={errors} control={control} label="Body" name="body" />
                  <FormText vehicle={vehicle} errors={errors} control={control} label="Color" name="color" />
                  <Button type="submit" color="primary" variant="contained" disabled={isLoading}>Save</Button>
                </form>
              }
            </AccordianBody>
          </AccordianItem>
          <AccordianItem>
            <AccordianHead>
              Connected Member
            </AccordianHead>
            <AccordianBody>
              {vehicle && vehicle.member &&
                <Link to={`/member/view/${vehicle.member.id}`}>
                  {vehicle.member.first_name} {vehicle.member.last_name}
                </Link>
              }
            </AccordianBody>
          </AccordianItem>
          <AccordianItem>
            <AccordianHead>
              Visit History
            </AccordianHead>
            <AccordianBody>
              {vehicle && <VisitHistory data={vehicle.records} noHead />}
            </AccordianBody>
          </AccordianItem>
          <AccordianItem>
            <AccordianHead>
              Flag History
            </AccordianHead>
            <AccordianBody>
              {vehicle && <FlagHistory vehicleOrigin={vehicle} />}
            </AccordianBody>
          </AccordianItem>
        </Accordian>
      </DataBox>
    </div>
  );
};

export default VehicleRecord;

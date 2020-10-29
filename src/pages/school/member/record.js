import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useRecoilCallback } from "recoil";
import { updateFieldsAction } from "actions/school/members";
import api from "api";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, MenuItem } from "@material-ui/core";
import { Accordian, AccordianItem, AccordianHead, AccordianBody } from "components/Accordian";
import PageBackLink from "components/PageBackLink";
import DataBox from "components/DataBox";
import MemberConnect from "components/school/MemberConnect";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  uppercase: {
    textTransform: 'uppercase'
  }
});

const FormText = ({ member, errors, label, name, ...props }) => (
  <Controller
    fullWidth
    variant="outlined"
    size="small"
    label={label}
    name={name}
    as={TextField}
    defaultValue={member[name]}
    error={!!errors[name]}
    helperText={errors[name] && <span>This field is required</span>}
    rules={{ required: true }}
    {...props}
  />
);

const MemberView = () => {

  const classes = useStyles();
  const { id } = useParams();
  const membersUpdateFields = useRecoilCallback(updateFieldsAction);
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    setIsLoading(true);
    const response = await api.post('/member/update', { id, ...data });
    if (response) {
      setMember(response.data);
      membersUpdateFields(member, response.data);
    }
    setIsLoading(false);
  };

  const updateVehicles = vehicles => {
    setMember({ ...member, vehicles });
    membersUpdateFields(member, {vehicles});
  }

  useEffectOnce(() => {
    const load = async () => {
      setIsLoading(true);
      const response = await api.post('/member/view', { id });
      if (response) {
        setMember(response.data);
      }
      setIsLoading(false);
    };
    load();
  });

  return (
    <div className={classes.space}>
      <PageBackLink to="/member">
        Members
      </PageBackLink>
      <DataBox height={100} loading={isLoading}>
        <Accordian>
          <AccordianItem>
            <AccordianHead>
              Personal Information
            </AccordianHead>
            <AccordianBody>
              {member &&
                <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
                  <FormText member={member} errors={errors} control={control} label="Group" name="group" select>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="faculty">Faculty</MenuItem>
                  </FormText>
                  <FormText member={member} errors={errors} control={control} label="First Name" name="first_name" />
                  <FormText member={member} errors={errors} control={control} label="Last Name" name="last_name" />
                  <FormText member={member} errors={errors} control={control} label="Address" name="address" />
                  <FormText member={member} errors={errors} control={control} label="Email" name="email" />
                  <FormText member={member} errors={errors} control={control} label="Phone" name="phone" />
                  <FormText member={member} errors={errors} control={control} label="Grade" name="grade" />
                  <FormText member={member} errors={errors} control={control} label="Graduation" name="graduation" />
                  <Button type="submit" color="primary" variant="contained" disabled={isLoading}>Save</Button>
                </form>
              }
            </AccordianBody>
          </AccordianItem>
          <AccordianItem>
            <AccordianHead>
              Vehicles
            </AccordianHead>
            <AccordianBody>
              {member &&
                <div className={classes.space}>
                  <MemberConnect member={member} update={updateVehicles} />
                  {member.vehicles.map(vehicle =>
                    <div key={vehicle.id}>
                      <Link to={`/vehicle/view/${vehicle.id}`}>
                        {vehicle.plate}
                      </Link>
                    </div>
                  )}
                </div>
              }
            </AccordianBody>
          </AccordianItem>
        </Accordian>
      </DataBox>
    </div>
  );
};

export default MemberView;
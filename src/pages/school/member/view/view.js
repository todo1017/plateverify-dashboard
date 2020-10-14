import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useRecoilState } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import { Button, List, ListItem, ListItemIcon, ListItemText, Divider, Paper, Collapse, TextField, MenuItem } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import api from "containers/api";
import PageHead from "components/_custom/pageHead";
import StatusBox from "components/_custom/statusBox";
import memberViewAtom from "atoms/memberView";
import { useEffectOnlyOnce } from "util/custom";

const useStyles = makeStyles({
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

const MemberView = () => {

  const classes = useStyles();
  const { id } = useParams();
  const [memberView, setMemberView] = useRecoilState(memberViewAtom);
  const [memberOpen, setMemberOpen] = useState(true);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    setMemberView({...memberView, isUpdating: true});
    const response = await api.post('/member/update', {
      id,
      ...data
    });
    if (response) {
      console.log(response);
      setMemberView({
        ...memberView,
        isUpdating: false,
        data: response.data
      });
    } else {
      setMemberView({
        ...memberView,
        isUpdating: false,
        data: null
      });
    }
  };

  useEffectOnlyOnce(() => {
    setMemberView({...memberView, isLoading: true});
    const load = async () => {
      const response = await api.post('/member/view', { id });
      if (response) {
        setMemberView({
          ...memberView,
          isLoading: false,
          data: response.data
        });
      } else {
        setMemberView({
          ...memberView,
          isLoading: false,
          data: null
        });
      }
    };
    load();
  });

  return (
    <div className="app-wrapper">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <PageHead>
          <Link to="/member">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ListIcon />}>
              List
            </Button>
          </Link>
        </PageHead>
        <Paper>
          <StatusBox
            height={200}
            padding={0}
            type="circle"
            status={memberView.isLoading ? 'wait' : memberView.data === null ? 'empty' : ''}
          >
            {memberView.data &&
              <div>
                <List>
                  <ListItem button onClick={() => setMemberOpen(!memberOpen)}>
                    <ListItemIcon>
                      {memberOpen? <ExpandMoreIcon/> : <ChevronRightIcon />}
                    </ListItemIcon>
                    <ListItemText>
                      {memberView.data.first_name} {memberView.data.last_name}
                    </ListItemText>
                  </ListItem>
                  <Collapse in={memberOpen}>
                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>
                        <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
                          <Controller
                            fullWidth
                            select
                            variant="outlined"
                            size="small"
                            label="Group"
                            name="group"
                            as={TextField}
                            defaultValue={memberView.data.group}
                            error={!!errors.group}
                            helperText={errors.group && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="faculty">Faculty</MenuItem>
                          </Controller>
                          <Controller
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="First Name"
                            name="first_name"
                            as={TextField}
                            defaultValue={memberView.data.first_name}
                            error={!!errors.first_name}
                            helperText={errors.first_name && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          />
                          <Controller
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Last Name"
                            name="last_name"
                            as={TextField}
                            defaultValue={memberView.data.last_name}
                            error={!!errors.last_name}
                            helperText={errors.last_name && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          />
                          <Controller
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Address"
                            name="address"
                            as={TextField}
                            defaultValue={memberView.data.address}
                            error={!!errors.address}
                            helperText={errors.address && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          />
                          <Controller
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Email"
                            name="email"
                            as={TextField}
                            defaultValue={memberView.data.email}
                            error={!!errors.email}
                            helperText={errors.email && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          />
                          <Controller
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Phone"
                            name="phone"
                            as={TextField}
                            defaultValue={memberView.data.phone}
                            error={!!errors.phone}
                            helperText={errors.phone && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          />
                          <Controller
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Grade"
                            name="grade"
                            as={TextField}
                            defaultValue={memberView.data.grade}
                            error={!!errors.grade}
                            helperText={errors.grade && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          />
                          <Controller
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Graduation"
                            name="graduation"
                            as={TextField}
                            defaultValue={memberView.data.graduation}
                            error={!!errors.graduation}
                            helperText={errors.graduation && <span>This field is required</span>}
                            control={control}
                            rules={{ required: true }}
                          />
                          <Button
                            disabled={memberView.isUpdating}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                          >
                            update
                          </Button>
                        </form>
                      </ListItemText>
                    </ListItem>
                  </Collapse>
                  <Divider />
                  <ListItem button onClick={() => setVehiclesOpen(!vehiclesOpen)}>
                    <ListItemIcon>
                      {vehiclesOpen? <ExpandMoreIcon/> : <ChevronRightIcon />}
                    </ListItemIcon>
                    <ListItemText>
                      Vehicles
                    </ListItemText>
                  </ListItem>
                  <Collapse in={vehiclesOpen}>
                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>
                        <StatusBox
                          height={100}
                          padding={0}
                          status={memberView.data.vehicles.length === 0 ? 'empty' : ''}
                        >
                          <div className={classes.space}>
                            {memberView.data.vehicles.map(vehicle =>
                              <Link to={`/vehicle/view/${vehicle.id}`} key={vehicle.id}>
                                <div className="text-uppercase">{vehicle.plate}</div>
                              </Link>
                            )}
                          </div>
                        </StatusBox>
                      </ListItemText>
                    </ListItem>
                  </Collapse>
                </List>
              </div>
            }
          </StatusBox>
        </Paper>
      </div>
    </div>
  );
};

export default MemberView;
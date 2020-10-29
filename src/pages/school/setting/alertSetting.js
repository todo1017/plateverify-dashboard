import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRecoilValue, useRecoilCallback } from "recoil";
import settingAtom from "atoms/school/setting";
import { startAlertAction, addEntityAction, removeEntityAction, toggleOptionAction } from "actions/school/setting";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, IconButton, Backdrop, TextField, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import BlockIcon from '@material-ui/icons/Block';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import FormSelect from "components/FormSelect";

const useStyles = makeStyles({
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  padding: {
    padding: 16
  },
  backdrop: {
    zIndex: 1000,
    color: '#fff',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& > *+*': {
      marginLeft: 16
    }
  }
});

const Alert = () => {

  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const settingState = useRecoilValue(settingAtom);
  const startAlert = useRecoilCallback(startAlertAction);
  const addEntity = useRecoilCallback(addEntityAction);
  const removeEntity = useRecoilCallback(removeEntityAction);
  const toggleOption = useRecoilCallback(toggleOptionAction);
  const [formOpen, setFormOpen] = useState(false);
  
  const onSubmit = async values => {
    addEntity(values.type, values.entity);
    setFormOpen(false);
  };

  return (
    <React.Fragment>
      {settingState.init &&
        <React.Fragment>
          {settingState.alert === null ?
            <Button
              color="primary"
              variant="contained"
              onClick={startAlert}
              disabled={settingState.isLoading}
            >
              Get started
            </Button> :
            <div className={classes.space}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setFormOpen(true)}
                startIcon={<AddIcon />}
                disabled={settingState.isLoading}
              >
                Add Entity
              </Button>
              {settingState.alert.body.map((item, index) =>
                <List key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {item.type === 'email' && <EmailIcon className={classes.icon} />}
                      {item.type === 'sms' && <PhoneAndroidIcon className={classes.icon} />}
                    </ListItemIcon>
                    <ListItemText>
                      {item.entity}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText>
                      <Button
                        startIcon={item.offender ? <CheckIcon /> : <BlockIcon />}
                        color={item.offender ? 'primary' : ''}
                        onClick={() => toggleOption(index, 'offender', !item.offender)}
                      >
                        Perimeter Defender
                      </Button>
                      <Button
                        startIcon={item.flagged ? <CheckIcon /> :  <BlockIcon />}
                        color={item.flagged ? 'primary' : ''}
                        onClick={() => toggleOption(index, 'flagged', !item.flagged)}
                      >
                        Flagged Vehicle
                      </Button>
                      <IconButton color="secondary" onClick={() => removeEntity(index)}>
                        <CloseIcon />
                      </IconButton>
                    </ListItemText>
                  </ListItem>
                </List>
              )}
            </div>
          }
        </React.Fragment>
      }
      <Backdrop className={classes.backdrop} open={formOpen}>
        <Paper className={classes.padding}>
          <form className={classes.space} onSubmit={handleSubmit(onSubmit)}>
            <FormSelect
              label="Select Type"
              name="type"
              defaultValue=""
              error={!!errors.type}
              helperText={errors.type && <span>This field is required</span>}
              control={control}
              rules={{ required: true }}
              options={['email', 'sms']}
            />
            <Controller
              fullWidth
              variant="outlined"
              size="small"
              label="Target"
              name="entity"
              as={TextField}
              defaultValue=""
              error={!!errors.entity}
              helperText={errors.entity && <span>This field is required</span>}
              control={control}
              rules={{ required: true }}
            />
            <div className={classes.buttons}>
              <IconButton color="primary" type="submit">
                <CheckIcon />
              </IconButton>
              <IconButton onClick={() => setFormOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </form>
        </Paper>
      </Backdrop>
    </React.Fragment>
  );
};

export default Alert;

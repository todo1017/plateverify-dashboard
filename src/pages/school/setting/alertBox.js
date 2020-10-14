import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, Modal, Backdrop, Fade, CircularProgress, TextField } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import settingAtom from "atoms/settingAtom";
import api from "containers/api";
import StatusBox from "components/_custom/statusBox";
import FormSelect from "components/_custom/formSelect";

const useStyles = makeStyles({
  getStarted: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  space: {
    '& > *+*': {
      marginTop: 16
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 300,
    padding: 16,
    '& > *+*': {
      marginTop: 16
    }
  },
  icon: {
    width: 40,
    textAlign: 'center'
  },
  entity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    marginTop: 32
  },
  entityAction: {
    color: '#CCC',
    '& > *+*': {
      marginLeft: 8
    }
  },
});

const Alert = () => {

  const classes = useStyles();
  const { control, handleSubmit, errors, reset } = useForm();
  const [setting, setSetting] = useRecoilState(settingAtom);
  const [formOpen, setFormOpen] = useState(false);
  const onSubmit = async values => {
    setSetting({ ...setting, isUpdating: true });
    let data = {
      category: 'alert',
      body: [
        ...setting.alert.body,
        {
          type: values.type,
          entity: values.entity,
          offender: false,
          flagged: false
        }
      ]
    };
    const response = await api.post('/setting/update', data);
    if (response) {
      setSetting({
        ...setting,
        isUpdating: false,
        alert: response.data
      });
      reset();
    } else {
      setSetting({ ...setting, isUpdating: false });
    }
  };

  const handleGetStarted = async () => {
    if (!setting.isUpdating) {
      setSetting({
        ...setting,
        isUpdating: true
      });
      const response = await api.post('/setting/start', {
        category: 'alert'
      });
      if (response) {
        setSetting({
          ...setting,
          isUpdating: true,
          alert: response.data
        });
      } else {
        setSetting({
          ...setting,
          isUpdating: false
        });
      }
    }
  };

  const toggleStatus = async (index, attr, value) => {
    let body = setting.alert.body.map((d, i) => {
      if (i === index) {
        return {
          ...d,
          [attr]: value
        };
      }
      return d;
    });
    const response = await api.post('/setting/update', {
      category: 'alert',
      body
    });
    if (response) {
      setSetting({
        ...setting,
        alert: response.data
      });
    }
  };

  return (
    <div>
      {setting.alert === null &&
        <div className={classes.getStarted}>
          <Button
            color="primary"
            variant="contained"
            startIcon={setting.isUpdating && <CircularProgress color="inherit" size={16} />}
            onClick={handleGetStarted}
          >
            Get started
          </Button>
        </div>
      }
      {setting.alert &&
        <div>
          <Button
            onClick={() => setFormOpen(true)}
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add
          </Button>
          <StatusBox
            height={100}
            padding={0}
            status={setting.alert.body.length === 0 ? 'empty' : ''}
          >
            {setting.alert.body.map((item, index) =>
              <div className={classes.entity} key={index}>
                <div>
                  {item.type === 'email' && <EmailIcon className={classes.icon} />}
                  {item.type === 'sms' && <PhoneAndroidIcon className={classes.icon} />}
                  {item.entity}
                </div>
                <div className={classes.entityAction}>
                  <Button
                    variant="outlined"
                    color={item.offender ? 'primary' : 'inherit'}
                    onClick={() => toggleStatus(index, 'offender', !item.offender)}
                  >
                    Perimeter Defender
                  </Button>
                  <Button
                    variant="outlined"
                    color={item.flagged ? 'primary' : 'inherit'}
                    onClick={() => toggleStatus(index, 'flagged', !item.flagged)}
                  >
                    Flagged Vehicle
                  </Button>
                </div>
              </div>
            )}
          </StatusBox>
        </div>
      }
      <Modal
        className={classes.modal}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 100 }}
      >
        <Fade in={formOpen}>
          <Paper>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
              <Button
                disabled={setting.isUpdating}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                submit
              </Button>
            </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Alert;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Fade, Backdrop, Paper, Button, FormControl, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import memberActions from "store/school/member/actions";

const useStyles = makeStyles({
  root: {
    color: '#4caf50',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:hover' : {
      textDecoration: 'underline',
    }
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    maxWidth: 300,
    maxHeight: '100%',
    overflowY: 'auto',
    padding: 16,
  },
  section: {
    '& .MuiButton-label': {
      justifyContent: 'space-between'
    },
    '& > *': {
      marginBottom: 8
    }
  },
});

const ConnectVehicle = ({ member }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const memberState = useSelector(state => state.School.Member);
  const [oldVehicles, setOldVehicles] = useState([]);
  const [newVehicles, setNewVehicles] = useState([]);
  const [form, setForm] = useState(false);
  const [keyword, setKeyword] = useState('');
  
  useEffect(() => {
    const vehicles = member.vehicles.map(vehicle => ({...vehicle, check: true}))
    setOldVehicles(vehicles);
  }, [member]);

  useEffect(() => {
    const vehicles = memberState.vehicles.map(vehicle => ({...vehicle, check: false}))
    setNewVehicles(vehicles);
  }, [member, memberState]);

  const handleFind = () => {
    dispatch(memberActions.find({ keyword }));
  };
  
  const toggleOld = vehicle => {
    const vehicles = oldVehicles.map(v => {
      if (v.id === vehicle.id) {
        return {
          ...v,
          check: !v.check
        }
      }
      return v
    });
    setOldVehicles(vehicles);
  };

  const toggleNew = vehicle => {
    const vehicles = newVehicles.map(v => {
      if (v.id === vehicle.id) {
        return {
          ...v,
          check: !v.check
        }
      }
      return v
    });
    setNewVehicles(vehicles);
  };

  const handleSubmit = () => {
    const remove = oldVehicles.filter(vehicle => !vehicle.check).map(v => v.id);
    const add = newVehicles.filter(vehicle => vehicle.check).map(v => v.id);
    dispatch(memberActions.connect({
      memberId: member.id,
      remove,
      add
    }));
  };

  const openForm = () => {
    setForm(true);
    setKeyword('');
    setNewVehicles([]);
  }

  return (
    <>
      <span className={classes.root} onClick={openForm}>
        Connect Vehicle
      </span>
      <Modal
        className={classes.modal}
        open={form}
        onClose={() => setForm(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 100 }}>
        <Fade in={form}>
          <Paper className={classes.form}>
            <div className={classes.section}>
              <FormControl fullWidth>
                <OutlinedInput
                  type="text"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleFind}
                        edge="end">
                        <ArrowForwardIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {oldVehicles.map(vehicle =>
                <Button
                  key={vehicle.id}
                  fullWidth
                  variant="outlined"
                  color={vehicle.check ? 'secondary' : 'default'}
                  className={classes.button}
                  endIcon={vehicle.check ? <CloseIcon /> : <AddIcon />}
                  onClick={() => toggleOld(vehicle)}>
                  {vehicle.plate}
                </Button>
              )}
              {newVehicles.map(vehicle =>
                <Button
                  key={vehicle.id}
                  fullWidth
                  variant="outlined"
                  color={vehicle.check ? 'secondary' : 'default'}
                  className={classes.button}
                  endIcon={vehicle.check ? <CloseIcon /> : <AddIcon />}
                  onClick={() => toggleNew(vehicle)}>
                  {vehicle.plate}
                </Button>
              )}
            </div>
            <Button fullWidth color="primary" variant="contained" onClick={handleSubmit}>
              submit
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default ConnectVehicle;
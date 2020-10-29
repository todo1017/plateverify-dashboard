import React, { useState } from "react";
import api from "api";
import { Backdrop, Button, IconButton, TextField, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DataBox from "components/DataBox";

const useStyles = makeStyles({
  btn: {
    textTransform: 'none'
  },
  backdrop: {
    zIndex: 1000,
    color: '#fff',
  },
  main: {
    width: 300,
    maxHeight: '100%',
    overflowY: 'auto',
  },
  space: {
    '& > *+*': {
      marginTop: 8
    }
  },
  keywordBox: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    '& > *+*': {
      marginLeft: 8
    }
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    '& > *+*': {
      marginLeft: 16
    }
  }
});

const MemberConnect = ({ member, update }) => {

  const classes = useStyles();
  const [vehicles, setVehicles] = useState([]);
  const [unchecked, setUnchecked] = useState({});
  const [checked, setChecked] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleKeywordSearch = async () => {
    setIsLoading(true);
    const response = await api.post('/vehicle/keyword_search', { keyword });
    setIsLoading(false);
    if (response) {
      setVehicles(response.data);
      setChecked([]);
      setUnchecked([]);
    }
  };

  const toggleUnchecked = (id) => {
    setUnchecked({
      ...unchecked,
      [id]: !!!unchecked[id]
    });
  };

  const toggleChecked = (id) => {
    setChecked({
      ...checked,
      [id]: !!!checked[id]
    });
  };

  const closeForm = () => {
    setVehicles([]);
    setChecked([]);
    setUnchecked([]);
    setKeyword('');
    setFormOpen(false);
  }

  const handleSubmit = async () => {

    const memberId = member.id;
    let remove = [];
    let add = [];
    for (const key in unchecked) {
      if (unchecked[key]) {
        remove.push(key);
      }
    }
    for (const key in checked) {
      if (checked[key]) {
        add.push(key);
      }
    }

    setIsLoading(true);
    const response = await api.post('/member/connect', { memberId, remove, add });
    setIsLoading(false);

    update(response.data.vehicles);
    closeForm();
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        variant="contained"
        disableElevation
        className={classes.btn}
        onClick={() => setFormOpen(true)}
      >
        Connect
      </Button>
      <Backdrop
        className={classes.backdrop}
        open={formOpen}
        onClick={() => {}}
      >
        <div className={classes.main}>
          <DataBox height={100} loading={isLoading}>
            <div className={classes.space}>
              <div className={classes.keywordBox}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                />
                <IconButton onClick={handleKeywordSearch}>
                  <SearchIcon />
                </IconButton>
              </div>
              <List component="div">
                {member.vehicles.map(vehicle =>
                  <ListItem
                    button
                    onClick={() => toggleUnchecked(vehicle.id)}
                    key={vehicle.id}
                  >
                    <ListItemIcon>{!unchecked[vehicle.id] && <CheckIcon />}</ListItemIcon>
                    <ListItemText primary={vehicle.plate.toUpperCase()} />
                  </ListItem>
                )}
                {vehicles.map(vehicle =>
                  <ListItem
                    key={vehicle.id}
                    button
                    onClick={() => toggleChecked(vehicle.id)}
                  >
                    <ListItemIcon>{checked[vehicle.id] && <CheckIcon />}</ListItemIcon>
                    <ListItemText primary={vehicle.plate.toUpperCase()} />
                  </ListItem>
                )}
              </List>
              <div className={classes.buttons}>
                <IconButton onClick={handleSubmit}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={closeForm}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </DataBox>
        </div>
      </Backdrop>
    </React.Fragment>
  );
};

export default MemberConnect;
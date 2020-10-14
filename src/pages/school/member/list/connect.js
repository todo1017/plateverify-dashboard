import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Modal, Fade, Backdrop, Paper, Button, FormControl, OutlinedInput, InputAdornment, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider, CircularProgress } from '@material-ui/core';
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckIcon from '@material-ui/icons/Check';
import memberListAtom from "atoms/memberList";
import api from "containers/api";

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    minWidth: 300,
    maxHeight: '100%',
    overflowY: 'auto',
  },
  padding: {
    padding: 16
  },
  space: {
    '& > *+*': {
      marginTop: 8
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const ConnectForm = ({ open, onClose, member }) => {

  const classes = useStyles();
  const [memberList, setMemberList] = useRecoilState(memberListAtom);
  const [vehicles, setVehicles] = useState([]);
  const [unchecked, setUnchecked] = useState({});
  const [checked, setChecked] = useState({});
  const [keyword, setKeyword] = useState('');
  const [pagination ,setPagination] = useState({
    isLoading: false,
    items: [],
    currentPage: 1,
    totalItems: 0,
    keyword: ''
  });
  const pageCount = Math.ceil(pagination.totalItems / 5);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    if (member) {
      setVehicles(member.vehicles);
      setChecked({});
      setUnchecked({});
      setKeyword('');
    }
  }, [member]);

  const handleKeywordSearch = async () => {
    setPagination({
      ...pagination,
      isLoading: true
    });
    const response = await api.post('/vehicle/search', {
      page: 1,
      limit: 5,
      keyword
    });
    if (response) {
      setPagination({
        ...pagination,
        isLoading: false,
        items: response.data.items,
        currentPage: response.data.meta.currentPage,
        totalItems: response.data.meta.totalItems,
        keyword
      });
    } else {
      setPagination({
        ...pagination,
        isLoading: false,
        items: [],
        currentPage: 1,
        totalItems: 0
      });
    }
  };

  const handlePagination = async () => {
    const response = await api.post('/vehicle/search', {
      page: pagination.currentPage + 1,
      limit: 5,
      keyword: pagination.keyword
    });
    if (response) {
      setPagination({
        ...pagination,
        items: response.data.items,
        currentPage: response.data.meta.currentPage,
        totalItems: response.data.meta.totalItems,
      });
    }
  }

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
  
  const handleSubmit = async () => {
    setIsUpdating(true);

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

    const response = await api.post('/member/connect', {
      memberId: member.id,
      remove,
      add
    });

    setIsUpdating(false);

    if (response) {
      const items = memberList.items.map(item => {
        if (item.id === member.id) {
          return response.data;
        }
        return item;
      });
      setMemberList({
        ...memberList,
        items
      });

      setVehicles(response.data.vehicles);
      setChecked({});
      setUnchecked({});
      setKeyword('');
      setPagination({
        items: [],
        currentPage: 1,
        totalItems: 0
      })
    }
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 100 }}
    >
      <Fade in={open}>
        <Paper className={classes.form}>
          <div className={classes.padding}>
            <FormControl fullWidth disabled={pagination.isLoading}>
              <OutlinedInput
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleKeywordSearch}
                      edge="end">
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <List component="div">
            {vehicles.map(vehicle =>
              <ListItem
                key={vehicle.id}
                button
                onClick={() => toggleUnchecked(vehicle.id)}
              >
                <ListItemIcon>{!unchecked[vehicle.id] && <CheckIcon />}</ListItemIcon>
                <ListItemText primary={vehicle.plate.toUpperCase()} />
              </ListItem>
            )}
          </List>
          <Divider />
          <List component="div">
            {pagination.items.map(vehicle =>
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
          <div className={classes.center}>
            <Pagination
              count={pageCount}
              page={pagination.currentPage}
              onChange={handlePagination}
            />
          </div>
          <div className={classes.padding}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={isUpdating && <CircularProgress size={16} />}
              onClick={handleSubmit}
            >
              update
            </Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ConnectForm;
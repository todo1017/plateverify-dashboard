import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const BtnLogout = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <React.Fragment>
      <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default BtnLogout;
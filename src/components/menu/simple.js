import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";

const Header = ({ onChange, values }) => {

  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setValue(values[0]);
  }, [values]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (value) => {
    setAnchorEl(null);
    setValue(value);
    onChange(value);
  }

  return (
    <>
      <Button variant="outlined" onClick={handleMenuOpen}>
        Range: {value}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        getContentAnchorEl={null}
      >
        {values.map(value =>
          <MenuItem onClick={e => handleChange(value)} key={value}>
            {value}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};


export default Header;

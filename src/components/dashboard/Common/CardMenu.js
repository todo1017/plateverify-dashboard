import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const CardMenu = (props) => {

  const options = [
    "popup.updateData",
    "popup.updateData",
    "popup.updateData",
    "popup.detailedLog",
    "popup.statistics",
    "popup.clearData"
  ];
  const {menuState, anchorEl, handleRequestClose} = props;
  return (
    <Menu id="long-menu"
          anchorEl={anchorEl}
          open={menuState}
          onClose={handleRequestClose}

          MenuListProps={{
            style: {
              width: 150,
              paddingTop: 0,
              paddingBottom: 0
            },
          }}>
      {options.map(option =>
        <MenuItem key={option} onClick={handleRequestClose}>
          {option}
        </MenuItem>,
      )}
    </Menu>
  );
};

export default CardMenu;
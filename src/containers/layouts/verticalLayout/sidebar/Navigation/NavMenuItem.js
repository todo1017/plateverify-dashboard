import React from 'react';
import { List } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const NavMenuItem = props => {
  const {name, Icon, link} = props;

  return (
    <List component="div" className='nav-menu-item'>
      <NavLink className="prepend-icon nav-menu-link" to={link}>
        {/* Display an icon if any */}
        <Icon style={{ marginRight: 12, fontSize: 16 }} />
        <span className="nav-text">
          {name}
        </span>
      </NavLink>
    </List>
  )
};

export default NavMenuItem;

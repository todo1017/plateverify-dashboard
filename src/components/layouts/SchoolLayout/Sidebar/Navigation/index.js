import React from 'react';
import { List } from '@material-ui/core';
import NavMenuItem from "./NavMenuItem";
import NavSection from "./NavSection";

const Navigation = props => {
  const {menuItems} = props;
  return (
    <List component="nav" disablePadding>
      {
        menuItems.map((item, index) => {
          switch (item.type) {
            case 'section' :
              return <NavSection {...item} key={index}/>;
            default:
              return <NavMenuItem {...item} key={index}/>;
          }
        })
      }
    </List>
  )
};

export default Navigation;
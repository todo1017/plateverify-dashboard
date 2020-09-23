import React from 'react';
import { List } from '@material-ui/core';

import NavMenuItem from "./NavMenuItem";
import NavCollapse from "./NavCollapse";

const NavSection = props => {
  const {name, icon, children = []} = props;
  const isExpandable = children && children.length > 0;

  const MenuCollapse = (
    <List component="div" className='nav-header'>
      {/* Display an icon if any */}
      {!!icon && (
        <i className={'zmdi zmdi-hc-fw  zmdi-' + icon}/>
      )}
      {name}
    </List>
  );

  const MenuItemChildren = isExpandable ? (
      <List component="div" disablePadding>
        {
          children.map((item, index) => {
            switch (item.type) {
              case 'section' :
                return <NavSection {...item} key={index}/>;
              case 'collapse' :
                return <NavCollapse {...item} key={index}/>;
              default:
                return <NavMenuItem {...item} key={index}/>;
            }
          })
        }
      </List>
  ) : null;

  return (
    <div className="nav-section">
      {MenuCollapse}
      {MenuItemChildren}
    </div>
  )
};

export default NavSection;

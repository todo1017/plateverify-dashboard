import React from 'react';
import { List } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import NavMenuItem from "./NavMenuItem";

const useStyles = makeStyles({
  navHeader: {
    color: '#666666',
    paddingTop: 40,
    paddingBottom: 10,
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    borderTop: 'solid 1px #343434'
  },
});

const NavSection = props => {

  const classes = useStyles();
  const { name, children = [] } = props;
  const isExpandable = children && children.length > 0;

  const MenuCollapse = (
    <List component="div" className={classes.navHeader}>
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
            default:
              return <NavMenuItem {...item} key={index}/>;
          }
        })
      }
    </List>
  ) : null;

  return (
    <div>
      {MenuCollapse}
      {MenuItemChildren}
    </div>
  )
};

export default NavSection;

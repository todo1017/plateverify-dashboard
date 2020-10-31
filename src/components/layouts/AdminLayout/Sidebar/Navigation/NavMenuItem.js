import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { List } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";

const useStyles = makeStyles({
  menuItem: {
    marginBottom: 1,
    padding: 0
  },
  menuLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#a1a1a1 !important',
    fontSize: 14,
    padding: '7px 30px 8px 20px',
    letterSpacing: '0.02857em',
    lineHeight: 1.5,
    textDecoration: 'none !important',
    borderTopRightRadius: '1.875rem',
    borderBottomRightRadius: '1.875rem',
    marginRight: 20,
    '&:hover': {
      backgroundColor: '#673ab7',
      color: '#fff !important'
    },
    '&.active': {
      backgroundColor: '#673ab7',
      color: '#fff !important'
    }
  }
});

const NavMenuItem = props => {

  const classes = useStyles();
  const location = useLocation();
  const { name, link, Icon } = props;

  return (
    <List component="div" className={classes.menuItem}>
      <Link className={cn(classes.menuLink, {active: location.pathname.includes(link)})} to={link}>
        <Icon style={{ marginRight: 12, fontSize: 16 }} />
        <span>{name}</span>
      </Link>
    </List>
  )
};

export default NavMenuItem;

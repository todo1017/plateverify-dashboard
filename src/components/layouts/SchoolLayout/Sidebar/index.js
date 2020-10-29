import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import authAtom from "atoms/auth";
import navAtom from "atoms/nav";
import CustomScrollbars from "components/layouts/CustomScrollbars";
import menuBuillder from "../menuBuillder";
import Navigation from "./Navigation";

const useEffectOnce = func => useEffect(func, []);

const useStyles = makeStyles(theme => ({
  appSidebar: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: 250,
    minWidth: 250,
    maxWidth: 250,
    zIndex: 1,
    // [theme.breakpoints.down('sm')]: {
    //   display: 'none'
    // },
  },
  sidebarNav: {
    width: 250,
    backgroundColor: '#252525 !important',
    color: '#a1a1a1 !important',
    borderRight: '0 none !important',
    zIndex: '1250 !important'
  },
  logoWrap: {
    textAlign: 'center',
    margin: 16
  },
  logo: {
    width: 72
  },
  title: {
    marginTop: 16,
    fontSize: 18,
    color: 'white'
  },
  power: {
    textTransform: 'uppercase',
    color: 'grey',
    marginTop: 16
  }
}));

const Sidebar = () => {

  const classes = useStyles();
  const auth = useRecoilValue(authAtom);
  const [nav, setNav] = useRecoilState(navAtom);
  const [width, setWidth] = useState(0);
  const menuOptions = menuBuillder(auth.user);
  const closeNav = () => setNav({ open: false });

  useEffectOnce(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  });

  const type = width < 960 ? 'temporary' : 'permanent';

  return (
    <Drawer
      variant={type}
      open={width < 960 ? nav.open : true}
      onClose={closeNav}
      className={classes.appSidebar}
      classes={{ paper: classes.sidebarNav }}
    >
      <CustomScrollbars>
        <div className={classes.logoWrap}>
          <img className={classes.logo} src={auth.user.school.logo} alt=""/>
          <div className={classes.title}>{auth.user.school.name}</div>
          <div className={classes.power}>powered by plateverify</div>
        </div>
        <Navigation menuItems={menuOptions}/>
      </CustomScrollbars>
    </Drawer>
  );
};


export default Sidebar;

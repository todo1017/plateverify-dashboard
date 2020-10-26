import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CustomScrollbars from "util/CustomScrollbars";
import authAtom from "atoms/auth";
import navAtom from "atoms/nav";
import menuBuillder from "containers/menuBuillder";
import { useEffectOnlyOnce } from "util/custom";
import Navigation from "./Navigation";

const useStyles = makeStyles({
  logoWrap: {
    textAlign: 'center',
    margin: 16,
    paddingBottom: 32,
    borderBottom: 'solid 1px #343434'
  },
  logo: {
    width: 72
  },
  schoolName: {
    marginTop: 16,
    fontSize: 18,
    color: 'white'
  },
  protect: {
    textTransform: 'uppercase',
  }
});

const Sidebar = () => {

  const classes = useStyles();
  const auth = useRecoilValue(authAtom);
  const [nav, setNav] = useRecoilState(navAtom);
  const [width, setWidth] = useState(0);
  const type = width < 768 ? 'temporary' : 'permanent';
  const menuOptions = menuBuillder(auth.user);
  const closeNav = () => setNav({ open: false });

  useEffectOnlyOnce(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  })

  return (
    <div className="app-sidebar d-none d-md-flex">
      <Drawer
        variant={type}
        open={width < 768 ? nav.open : true}
        onClose={closeNav}
        className="app-sidebar-content"
        classes={{ paper: 'side-nav' }}
      >
        <CustomScrollbars className="scrollbar">
          {auth.user.school ?
            <div className={classes.logoWrap}>
              <img className={classes.logo} src={auth.user.school.logo} alt=""/>
              <div className={classes.schoolName}>
                {auth.user.school.name}
              </div>
              <div className={classes.protect}>Protected By Plateverify</div>
            </div> :
            <div className={classes.logoWrap}>
              <img className={classes.logo} src="/logo2.png" alt=""/>
              <div className={classes.schoolName}>
                PLATEVERIFY
              </div>
            </div>
          }
          <Navigation menuItems={menuOptions}/>
        </CustomScrollbars>
      </Drawer>
    </div>
  );
};


export default Sidebar;

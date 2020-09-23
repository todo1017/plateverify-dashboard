import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CustomScrollbars from "util/CustomScrollbars";
import layoutActions from "store/layout/actions";
import Navigation from "./Navigation";
import menuBuillder from "containers/menuBuillder";

const useStyles = makeStyles({
  logoWrap: {
    textAlign: 'center',
    margin: 16
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
  const dispatch = useDispatch();
  const { navCollapsed, width } = useSelector(state => state.Layout);
  const authState = useSelector(state => state.Auth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(layoutActions.updateWindowWidth(window.innerWidth))
    });
  }, [dispatch]);

  const onToggleCollapsedNav = (e) => {
    dispatch(layoutActions.toggleNav());
  };

  let type = 'permanent';
  if (width < 768) {
    type = 'temporary';
  }

  let menuOptions = menuBuillder(authState.user);

  return (
    <div className="app-sidebar d-none d-md-flex">
      <Drawer
        variant={type}
        open={width < 768 ? navCollapsed : true}
        onClose={onToggleCollapsedNav}
        className="app-sidebar-content"
        classes={{ paper: 'side-nav' }}>
        <CustomScrollbars className="scrollbar">
          <div className={classes.logoWrap}>
            <img className={classes.logo} src={authState.user.school.logo} alt=""/>
            <div className={classes.schoolName}>
              {authState.user.school.name}
            </div>
            <div className={classes.protect}>Protected By Plateverify</div>
          </div>
          <Navigation menuItems={menuOptions}/>
        </CustomScrollbars>
      </Drawer>
    </div>
  );
};


export default Sidebar;

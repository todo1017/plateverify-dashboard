import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import BtnLogout from "./BtnLogout";
import BtnToggleNav from "./BtnToggleNav";

const useStyles = makeStyles(theme => ({
  appMainHeader: {
    width: 'auto !important',
    transition: 'all 0.5s cubic-bezier(0, 0, 0.2, 1) !important',
    left: 250,
    right: 0,
    [theme.breakpoints.down('sm')]: {
      left: 0
    },
  },
  appToolbar: {
    zIndex: 2,
    height: 70,
    maxHeight: 70
  },
  title: {
    color: 'white !important',
    fontSize: 18,
    textTransform: 'capitalize',
    textDecoration: 'none !important'
  },
  grow: {
    flexGrow: 1,
  },
  ellipseShape: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
    overflow: 'hidden',
    height: '100%',
    width: 560,
    '&::after': {
      content: '""',
      display: 'block',
      width: 870,
      position: 'absolute',
      top: -20,
      right: -300,
      height: 280,
      zIndex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '50% 0 0 50%'
    }
  }
}));

const Header = ({ title }) => {
  
  const classes = useStyles();

  return (
    <AppBar className={classes.appMainHeader}>
      <Toolbar className={classes.appToolbar} disableGutters={false}>
        <BtnToggleNav />
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.grow} />
        <BtnLogout />
        <div className={classes.ellipseShape}/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
import React, { useState, useEffect } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from 'classnames';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import layoutActions from "store/layout/actions";

const useStyles = makeStyles({
  pageTitle: {
    color: 'white !important',
    fontSize: 18,
    textTransform: 'capitalize',
    textDecoration: 'none !important'
  },
  grow: {
    flexGrow: 1,
  },
  logout: {
    color: '#ff9800'
  }
});

const Header = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const layoutState = useSelector(state => state.Layout);
  const [pageTitle, setPageTitle] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    let matched = layoutState.routes.filter(route => {
      return matchPath(location.pathname, {
        path: route.path,
        exact: true,
      });
    });
    if (matched.length) {
      setPageTitle(matched[0].pageTitle);
      document.title = 'Plateverify | ' + matched[0].pageTitle;
    } else {
      setPageTitle('');
      document.title = 'Plateverify';
    }
  }, [location.pathname, layoutState.routes]);

  const onToggleCollapsedNav = (e) => {
    const val = !layoutState.navCollapsed;
    dispatch(layoutActions.toggleNav(val));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <AppBar className="app-main-header">
      <Toolbar className="app-toolbar" disableGutters={false}>
        <IconButton
          className="jr-menu-icon mr-3 d-block d-md-none"
          aria-label="Menu"
          onClick={onToggleCollapsedNav}>
          <span className="menu-icon"/>
        </IconButton>
        <Link className={classnames('d-block', classes.pageTitle)} to="/">
          {pageTitle}
        </Link>
        <div className={classes.grow} />
        <IconButton
          edge="end"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
        <div className="ellipse-shape"/>
      </Toolbar>
    </AppBar>
  );
};


export default Header;

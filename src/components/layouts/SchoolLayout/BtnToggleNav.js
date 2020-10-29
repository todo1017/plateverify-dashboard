import React from "react";
import { useSetRecoilState } from "recoil";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import navAtom from "atoms/nav";

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  }
}));

const BtnToggleNav = () => {

  const classes = useStyles();
  const setNav = useSetRecoilState(navAtom);
  const showNav = () => setNav({ open: true });

  return (
    <IconButton className={classes.root} onClick={showNav}>
      <MenuIcon />
    </IconButton>
  );
};

export default BtnToggleNav;
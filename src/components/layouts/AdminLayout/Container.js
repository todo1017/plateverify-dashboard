import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";

const useStyles = makeStyles({
  appSite: {
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
    overflow: 'hidden'
  },
  appHeader: {
    minHeight: 70
  },
  mainContentWrapper: {
    flex: '1 1',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  mainContent: {
    width: '100%',
    flex: '1 1'
  },
  wrapper: {
    width: '100%',
    padding: 30
  },
  dashboard: {
    animationDuration: '0.3s',
    animationName: 'slideInUpTiny',
    animationFillMode: 'both'
  }
});

const Container =({ children })=> {

  const classes = useStyles();

  return (
    <div className={classes.appSite}>
      <div className={classes.appContainer}>
        <Sidebar/>
        <div className={classes.mainContainer}>
          <div className={classes.appHeader}>
            <Header />
          </div>
          <main className={classes.mainContentWrapper}>
            <div className={classes.mainContent}>
              <div className={classes.wrapper}>
                <div className={classes.dashboard}>
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Container;

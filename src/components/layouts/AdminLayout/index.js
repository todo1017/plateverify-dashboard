import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { isIOS, isMobile } from "react-device-detect";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadScreen from "components/layouts/LoadScreen";
import authAtom from "atoms/auth";
import theme from "./theme";
import Container from "./Container";
import ComponentWrap from "../ComponentWrap";
import routeBuilder from "./routeBuilder";

const applyTheme = createMuiTheme(theme);
const useEffectOnce = func => useEffect(func, []);

const AdminLayout = () => {

  const auth = useRecoilValue(authAtom);
  const [routes, setRoutes] = useState(null);

  useEffectOnce(() => {
    document.body.classList.add('dark-deep-purple');
  });

  useEffect(() => {
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }
  });

  useEffect(() => {
    if (auth.user) {
      setRoutes(routeBuilder(auth.user));
    }
  }, [auth.user]);

  if (routes) {
    return (
      <ThemeProvider theme={applyTheme}>
        <CssBaseline />
        <Container>
          <Switch>
            {routes.map(route =>
              <Route path={route.path} exact key={route.path}>
                <ComponentWrap component={route.component} />
              </Route>
            )}
            <Route path="*">
              <Redirect to={routes[0].path} />
            </Route>
          </Switch>
        </Container>
      </ThemeProvider>
    );
  }

  return <LoadScreen />;
  
};

export default AdminLayout;
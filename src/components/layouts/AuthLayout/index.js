import React, { useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import authAtom from "atoms/auth";
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadScreen from "components/layouts/LoadScreen";
import routes from "./routes";

const useEffectOnce = func => useEffect(func, []);

const AuthLayout = () => {

  const auth = useRecoilValue(authAtom);

  useEffectOnce(() => {
    if (auth.user) {
      window.location.href = "/";
    }
  }, [auth.user]);

  if (auth.init && !auth.user) {
    return (
      <div>
        <CssBaseline />
        <Switch>
          {routes.map(route =>
            <Route path={route.path} exact key={route.path}>
              <route.component />
            </Route>
          )}
          <Route path="*">
            <Redirect to={routes[0].path} />
          </Route>
        </Switch>
      </div>
    );
  }

  return <LoadScreen />;
};

export default AuthLayout;
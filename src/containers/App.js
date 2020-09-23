import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import authAction from 'store/auth/actions';
import layoutAction from 'store/layout/actions';
import AuthLayout from "containers/layouts/authLayout";
import AdminLayout from "containers/layouts/adminLayout";
import SchoolLayout from "containers/layouts/schoolLayout";
import LoadScreen from 'pages/auth/loadScreen';
import routeBuilder from './routeBuilder';

const useEffectOnlyOnce = (func) => useEffect(func, []);
let FinalLayout = null;
let finalRoutes = null;

const App = () => {
  const authState = useSelector(state => state.Auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffectOnlyOnce(() => {
    dispatch(authAction.verifyToken());
  });

  useEffect(() => {
    if (authState.action === authAction.TOKEN_FAILURE) {
      FinalLayout = AuthLayout;
      finalRoutes = routeBuilder(authState.user);
      history.push('/login');
    }

    if (authState.action === authAction.TOKEN_SUCCESS) {
      if (authState.user.roles.includes('ROLE_SCOPE_SCHOOL') === -1) {
        FinalLayout = AdminLayout;
        document.body.classList.add('dark-green');
      } else {
        FinalLayout = SchoolLayout;
        document.body.classList.add('dark-indigo');
      }
      finalRoutes = routeBuilder(authState.user);
      dispatch(layoutAction.registerRoutes(finalRoutes));
    }
  }, [authState, history, dispatch]);

  if (FinalLayout && finalRoutes) {
    return (
      <FinalLayout>
        <Switch>
          {finalRoutes.map(route =>
            <Route path={route.path} exact key={route.path}>
              <route.component />
            </Route>
          )}
          <Route path="*">
            <Redirect to={finalRoutes[0].path} />
          </Route>
        </Switch>
      </FinalLayout>
    );
  }

  return <LoadScreen />;
};

export default App;

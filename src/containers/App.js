import React, { useEffect } from 'react';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilState } from "recoil";
import authState from "atoms/auth";
import LoadScreen from 'pages/auth/loadScreen';
import api from "./api";
import routeBuilder from './routeBuilder';
import layoutBuilder from "./layoutBuilder";

const useEffectOnlyOnce = (func) => useEffect(func, []);
let Layout = null;
let routes = null;

const App = () => {

  const history = useHistory();
  const [auth, setAuth] = useRecoilState(authState);

  useEffectOnlyOnce(() => {
    const verifyToken = async () => {
      const response = await api.post('/auth/check');
      const user = response? response.data.user : null;
      Layout = layoutBuilder(user);
      routes = routeBuilder(user);
      if (!user) {
        history.push('/login');
      } else {
        if (user.school) {
          document.body.classList.add('dark-indigo');
        } else {
          document.body.classList.add('dark-deep-purple');
        }
      }
      setAuth({ init: true, user, routes });
    };
    verifyToken();
  });

  if (auth.init) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return <LoadScreen />;
};

export default App;

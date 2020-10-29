import React, { useEffect } from 'react';
import { useRecoilState } from "recoil";
import authState from "atoms/auth";
import AdminLayout from "./layouts/AdminLayout";
import SchoolLayout from "./layouts/SchoolLayout";
import AuthLayout from "./layouts/AuthLayout";
import api from "api";

const useEffectOnce = (func) => useEffect(func, []);

const App = () => {

  const [auth, setAuth] = useRecoilState(authState);

  useEffectOnce(() => {
    const verifyToken = async () => {
      const response = await api.post('/auth/check');
      const user = response? response.data.user : null;
      setAuth({ init: true, user });
    };
    verifyToken();
  });

  if (auth.user && auth.user.school) {
    return <SchoolLayout />;
  }

  if (auth.user && !auth.user.school) {
    return <AdminLayout />;
  }

  return <AuthLayout />;
};

export default App;
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from "react-router-dom";
import App from "containers/App";
import * as serviceWorker from "./serviceWorker";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('app-site')
);

serviceWorker.unregister();

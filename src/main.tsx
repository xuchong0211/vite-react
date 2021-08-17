import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router";

import "antd/dist/antd.css";
import "./styles/setting.css";
import "./styles/global.css";
import "./index.css";
import MyQueryClientProviders from "./lib/request/MyQueryClientProviders";

ReactDOM.render(
  <React.StrictMode>
    <MyQueryClientProviders>
      <AppRouter />
    </MyQueryClientProviders>
  </React.StrictMode>,
  document.getElementById("root")
);

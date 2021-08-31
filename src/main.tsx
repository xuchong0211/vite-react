import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router";
import "antd/dist/antd.less";
import "./index.less";
import MyQueryClientProviders from "./lib/request/MyQueryClientProviders";
import { useValidateRequest } from "./lib/request/api";
import { getCurrentLocale } from "./i18n/locales";
import { InlineLoading } from "./components/common/Loading";
import { LoadingProvider } from "./models/context/loading";
import { AppLocaleProvider, useLocale } from "./models/context/locale";

function BootScreen() {
  const { locale, setLocale } = useLocale();
  const toValidate = useValidateRequest();

  useEffect(() => {
    toValidate().then(() => {
      const locale = getCurrentLocale();
      console.log("initialize locale", locale);
      setLocale(locale);
    });
  }, []);

  return (
    <React.StrictMode>
      <MyQueryClientProviders>
        {!locale ? (
          <div className="App">
            <header className="App-body">
              <div className="about">RHCARE SYSTEM</div>
              {/*<p>Welcome</p>*/}
              <InlineLoading />
            </header>
          </div>
        ) : (
          <LoadingProvider>
            <AppRouter />
          </LoadingProvider>
        )}
      </MyQueryClientProviders>
    </React.StrictMode>
  );
}

ReactDOM.render(
  <AppLocaleProvider>
    <BootScreen />
  </AppLocaleProvider>,
  document.getElementById("root")
);

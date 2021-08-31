import React from "react";
import "./App.css";

import { Link } from "react-router-dom";
import { FixedButton } from "./components/common/Buttons";
import { useUserData } from "./models/data";
import { LogoutOutlined } from "@ant-design/icons/lib";
import { useLogoutRequest } from "./lib/request/api";
import Logout from "./components/common/Logout";
import { useLocale } from "./models/context/locale";
import { getIntlText, switchLocale } from "./i18n/locales";

function App(props: any) {
  const user = useUserData();
  const { locale, setLocale } = useLocale();
  const logout = useLogoutRequest();
  const username = user.value.username;
  return (
    <>
      <Logout />
      <div className="App">
        {username ? (
          <div className="logout" onClick={logout}>
            <LogoutOutlined
              twoToneColor="#eb2f96"
              style={{ fontSize: 25, color: "#3665b1" }}
            />
          </div>
        ) : null}
        <header className="App-body">
          <Link className="about" to="about">
            RHCARE SYSTEM
          </Link>
          <p
            onClick={() => {
              setLocale(switchLocale(locale));
            }}
          >
            {getIntlText("welcome")}
          </p>
          <FixedButton
            to={username ? "/entry" : "/signIn"}
            label={getIntlText(username ? "start" : "signin")}
          />
        </header>
      </div>
    </>
  );
}

export default App;

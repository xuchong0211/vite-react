import React, { useEffect } from "react";
import "./App.css";

import { Link } from "react-router-dom";
import { FixedButton } from "./components/common/Buttons";

function App(props: any) {
  console.log("app props........................", props);
  return (
    <div className="App">
      <header className="App-body">
        <Link className="about" to="about">
          Reliance Healthcare System
        </Link>
        <p>Welcome</p>
        <FixedButton to={"/signIn"} label={"Start"} />
      </header>
    </div>
  );
}

export default App;

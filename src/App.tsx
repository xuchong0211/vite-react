import React, { useEffect } from "react";
import "./App.css";

import { Link } from "react-router-dom";

function App(props: any) {
  console.log("app props........................", props);
  return (
    <div className="App">
      <header className="App-header">
        <p>Reliance Healthcare Booking System</p>
        <p>
          <Link to="step1">Start</Link>
        </p>
        <p>
          <Link to="about">about</Link>
        </p>
      </header>
    </div>
  );
}

export default App;

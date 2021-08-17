import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FixedButton } from "./components/common/Buttons";

export default function NotFound() {
  return (
    <div className="App">
      <header className="App-body">
        <p>Oops!</p>
        <FixedButton to="/" label="Back" />
      </header>
    </div>
  );
}

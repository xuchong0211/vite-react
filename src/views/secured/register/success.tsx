import React from "react";
import { Link } from "react-router-dom";
import { FixedButton } from "../../../components/common/Buttons";

export default function About(props: any) {
  return (
    <div className="App">
      <header className="App-body">
        <p>Registration has been successful!</p>
        <FixedButton to="/" label="Back" />
      </header>
    </div>
  );
}

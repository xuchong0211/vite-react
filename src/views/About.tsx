import React from "react";
import { FixedButton } from "../components/common/Buttons";

export default function About() {
  return (
    <div className="App">
      <header className="App-body">
        <div className="about">Welcome to About</div>
        <FixedButton to="/" label="Back" />
      </header>
    </div>
  );
}
import React from "react";
import { FixedButton } from "../components/common/Buttons";

export default function NotFound() {
  return (
    <div className="App">
      <header className="App-body">
        <p>Oops in register!</p>
        <FixedButton to="/" label="Back" />
      </header>
    </div>
  );
}

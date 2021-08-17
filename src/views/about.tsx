import React from "react";
import { FixedButton } from "../components/common/Buttons";

export default function About() {
  return (
    <div className="App">
      <header className="App-body">
        <>Welcome to About</>

        <FixedButton to="/" label="Back" />
      </header>
    </div>
  );
}

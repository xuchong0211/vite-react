import React from "react";
import { RedirectFixedButton } from "../../../components/common/Buttons";

export default function Success(props: any) {
  return (
    <div className="App">
      <header className="App-body">
        <p>Registration has been successful!</p>
        <RedirectFixedButton to="/entry" label="Back" />
      </header>
    </div>
  );
}

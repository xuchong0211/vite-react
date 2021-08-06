import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to About</p>
        <p>
          <Link to="/">Back</Link>
        </p>
      </header>
    </div>
  );
}

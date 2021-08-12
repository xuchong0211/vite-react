import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Page not found</p>
        <p>
          <Link to="/">back</Link>
        </p>
      </header>
    </div>
  );
}

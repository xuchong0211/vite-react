import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function About(props: any) {
  return (
    <div className="App">
      <header className="App-header">
        <p>Booking has been committed</p>
        <p>
          {/*<Button onClick={() => props.history.replace("/")}>Back</Button>*/}

          <Link to="/">Back</Link>
        </p>
      </header>
    </div>
  );
}

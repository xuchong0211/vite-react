import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  }, []);
  return (
    <div className="App">
      <header className="App-body"></header>
    </div>
  );
}

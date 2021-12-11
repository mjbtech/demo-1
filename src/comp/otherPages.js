import React from "react";
import { Link, useMatch } from "react-router-dom";

function Navbar() {
  const { other } = useMatch("/:other").params;
  console.log(other);
  return (
    <div style={{ padding: "2rem" }}>
      <h1>{other} Coming soon!</h1>
    </div>
  );
}

export default Navbar;

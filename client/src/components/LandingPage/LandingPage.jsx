import React from "react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <h1>Landing</h1>
      <NavLink to="/home/countries">
        <button> Comenzar! </button>
      </NavLink>
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div
      className="bg-image-Landing"
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to Around the World App</h1>
      <NavLink to="/home/countries">
        <button
          style={{ padding: "40px", borderRadius: "30px", fontSize: "120%" }}
        >
          {" "}
          Let's Start!{" "}
        </button>
      </NavLink>
    </div>
  );
}

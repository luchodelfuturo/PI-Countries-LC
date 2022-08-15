import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function FilterBar({ handleFilter, handleSort }) {
  // Opciones del select
  const regions = [
    "All Countries",
    "Africa",
    "Americas",
    "Antarctic",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const sort = ["A to Z", "Z to A", "High Population", "Low Population"];
  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-evenly",
        gap: "8px",
        fontSize: "70%",
        backgroundColor: "blueviolet",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <SearchBar />

      <select
        style={{
          backgroundColor: "blueviolet",
          border: "none",
          color: "white",
          width: "25%",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onChange={(e) => handleFilter(e)}
      >
        {regions.map((el) => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>

      <select
        style={{
          backgroundColor: "blueviolet",
          border: "none",
          color: "white",
          width: "25%",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onChange={(e) => handleSort(e)}
      >
        {sort.map((el) => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>

      <Link to={"/activities"}>
        <button
          style={{
            backgroundColor: "blueviolet",
            border: "none",
            color: "white",
            fontSize: "110%",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Explore Activities
        </button>
      </Link>
    </div>
  );
}

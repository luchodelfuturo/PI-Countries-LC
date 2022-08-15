import React from "react";
import { Link } from "react-router-dom";

export default function ActivityCard({
  handleClose,
  id,
  name,
  duration,
  difficulty,
  season,
  Countries,
}) {
  return (
    <div
      key={id}
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        backgroundColor: "lightgray",
        margin: "20px",
        minHeight: "80vh",
        height: "100%",
        borderRadius: "20px",
        color: "black",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <button
          style={{
            padding: "8px 14px",
            margin: "4px 10px",
            backgroundColor: "blueviolet",
            borderRadius: "6px",
            color: "white",
            fontWeight: "bold",
            border: "none",
          }}
          onClick={() => handleClose(id)}
        >
          X
        </button>
      </div>
      <div>
        <div
          style={{
            padding: "10px",

            width: "80%",
            fontSize: "70%",
            margin: "0 auto",
            textTransform: "uppercase",
          }}
        >
          <h2 style={{}}>{name}</h2>
        </div>
        <div
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "70%",
            width: "60%",
            margin: "0 auto",
          }}
        >
          details:
        </div>
        <ul
          style={{
            width: "80%",
            margin: "10px auto",
            textAlign: "start",
            textTransform: "uppercase",
            fontSize: "60%",
          }}
        >
          <li>
            season: <span>{season}</span>
          </li>
          <li>
            difficulty: <span>{difficulty}</span>
          </li>
          <li>
            duration: <span>{duration}'</span>
          </li>
        </ul>
        <div style={{ fontSize: "80%" }}>where?</div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginTop: "20px",
          alignItems: "center",
          justifyContent: "start",
          gap: "4px",
          flexWrap: "wrap",
        }}
      >
        {Countries?.map((country) => (
          <div key={country.name}>
            <ul
              style={{
                width: "80%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: "4px",
                textAlign: "start",
                listStyle: "none",
              }}
            >
              <li>{country.cod3letras}</li>
              <Link to={`/country/${country.cod3letras}`}>
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={country.flag}
                  alt={`${country.name} flag`}
                />
              </Link>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./CountryCard.css";

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cod3letras}`} className="link-card">
      <div className="card-country">
        <div>
          <img
            src={country.flag}
            alt={`Flag ${country.name}`}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "20px 20px 0 0px",
            }}
          />
        </div>
        <div className="">
          <h4 className="">{country.name}</h4>
          <p className="">capital: {country.capital ? country.capital : "-"}</p>
          <p className="">region: {country.region}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;

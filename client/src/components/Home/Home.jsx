import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByRegion,
  getAllCountries,
  orderByName,
  requestLoading,
} from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";

import "./Home.css";
import FilterBar from "../FilterBar/FilterBar";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const loading = useSelector((state) => state.loading);
  //Seteado Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordenado, setOrdenado] = useState("");
  const [countryPerPage, setCountryPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countryPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countryPerPage;

  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const cambiarPagina = (numberPage) => {
    // numberPage > 1 ? setCountryPerPage(10) : setCountryPerPage(10);
    setCurrentPage(numberPage);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterByRegion(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrdenado("Ordenado por:" + e.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
    dispatch(getAllCountries());
    setCountryPerPage(10);
  }, [dispatch]);

  return (
    <div className="Home">
      <div
        style={{
          minHeight: "50px",
          backgroundColor: "blueviolet",
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div>Around The World App</div>
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <FilterBar handleFilter={handleFilter} handleSort={handleSort} />
        {/*--- Country Main ---*/}
        <div
          style={{
            width: "90%",
            margin: "auto",
            marginTop: "4px",
            display: "flex",

            justifyContent: "space-around",
          }}
        >
          {!currentCountries.includes("No existe") && (
            <Pagination
              allCountries={allCountries}
              countryPerPage={countryPerPage}
              cambiarPagina={cambiarPagina}
              currentPage={currentPage}
            />
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "80%",
              maxWidth: "1400px",
              margin: "0 auto",
              gap: "8px",
              padding: "20px 0",
              height: "100%",
              overflowY: "scroll",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {!currentCountries.includes("No existe") ? (
              currentCountries.map((country) => {
                return (
                  <div key={country.cod3letras}>
                    <CountryCard country={country} />
                    {allCountries.length === 1 && (
                      <button onClick={() => dispatch(getAllCountries())}>
                        {" "}
                        Go Back
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div>
                <p>Country not found </p>
                <button onClick={() => dispatch(getAllCountries())}>
                  {" "}
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

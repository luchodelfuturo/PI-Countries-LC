import React from "react";

export default function Pagination({
  allCountries,
  countryPerPage,
  cambiarPagina,
  currentPage,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allCountries.length / countryPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav
      style={{
        display: "flex",
        gap: "2px",
        width: "100%",
        margin: "auto",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          height: "60px",
          fontSize: "150%",
        }}
        disabled={currentPage === pageNumber[0]}
        onClick={() => cambiarPagina(currentPage - 1)}
      >
        {"<"}
      </button>
      {pageNumber &&
        pageNumber.map((number) => {
          return (
            <button
              style={{ clickCursor: "pointer", width: "30px", height: "30px" }}
              className="btn-page"
              key={number}
              onClick={() => cambiarPagina(number)}
            >
              {number}
            </button>
          );
        })}
      <button
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          height: "60px",
          fontSize: "150%",
        }}
        onClick={() => cambiarPagina(currentPage + 1)}
        disabled={currentPage === pageNumber.length}
      >
        {">"}
      </button>
    </nav>
  );
}

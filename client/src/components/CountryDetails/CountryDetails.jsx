import React from "react";
import "./CountryDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCountryDetail, clearCountryDetail } from "../../redux/actions";
export default function CountryDetails() {
  const history = useHistory();
  const { cod3letras } = useParams();
  const dispatch = useDispatch();
  const { countryDetails } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCountryDetail(cod3letras));
    return () => {
      dispatch(clearCountryDetail());
    };
  }, [dispatch, cod3letras]);

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          padding: "0 0 20px 0",
        }}
      >
        <button
          style={{ padding: "4px", marginTop: "8px" }}
          onClick={() => history.goBack()}
        >
          Go Back
        </button>
        {countryDetails && countryDetails.name && (
          <h2>{countryDetails.name}</h2>
        )}
        <div
          style={{
            width: "80%",
            height: "100%",

            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "100%",
              margin: "0",
              overflow: "hidden",
            }}
          >
            <div>
              {countryDetails && countryDetails.flag && (
                <img
                  src={countryDetails.flag}
                  alt={countryDetails.name}
                  style={{ width: "200px", margin: "0 auto" }}
                />
              )}

              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  padding: "4px",
                  borderRadius: "5px",
                }}
              >
                {countryDetails && (
                  <div>
                    <ul
                      style={{
                        textAlign: "start",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {countryDetails.cod3letras && (
                        <li>
                          Code:
                          <span> {countryDetails.cod3letras}</span>
                        </li>
                      )}
                      {countryDetails.capital && (
                        <li>
                          Capital: <span>{countryDetails.capital}</span>
                        </li>
                      )}
                      {countryDetails.region && (
                        <li>
                          Region: <span>{countryDetails.region}</span>
                        </li>
                      )}
                      {countryDetails.subregion && (
                        <li>
                          Subregion: <span>{countryDetails.subregion}</span>
                        </li>
                      )}
                      {countryDetails.population > -2 && (
                        <li>
                          Population: <span>{countryDetails.population}</span>
                        </li>
                      )}
                      {countryDetails.demonyms && (
                        <li>
                          Demonyms: <span>{countryDetails.demonyms}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* Activities */}
            <div>
              {countryDetails && <h3>Activities</h3>}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "0 auto",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {countryDetails.activities &&
                  countryDetails.activities.map((activity) => (
                    <div
                      key={activity.name}
                      style={{
                        backgroundColor: "gray",
                        padding: "0 14px",
                        width: "300px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",

                        textAlign: "start",
                        margin: "0 auto",
                        borderRadius: "20px",
                      }}
                    >
                      <h4
                        style={{
                          width: "50%",
                          fontSize: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {activity.name}
                      </h4>
                      <ul
                        style={{
                          fontSize: "70%",
                          margin: "0 auto",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                          textAlign: "end",
                          listStyle: "none",
                        }}
                      >
                        <li>season: {activity.season}</li>
                        <li>difficulty: {activity.difficulty}</li>
                        <li>duration: {activity.duration}'</li>
                      </ul>
                    </div>
                  ))}
              </div>
              {countryDetails.activities &&
                countryDetails.activities.length === 0 && (
                  <div>
                    <div>No planned activities</div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

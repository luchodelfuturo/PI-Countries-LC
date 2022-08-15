import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterActvBySeason,
  getActivities,
  getAllCountries,
  postActivities,
} from "../../redux/actions/index";
import ActivityCard from "./ActivityCard";
import { removeActivity } from "../../redux/actions/index";
import { useHistory } from "react-router-dom";

export default function Activities() {
  const history = useHistory();
  const seasons = ["summer", "fall", "winter", "spring"];
  const { countries, activities, allActivities } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countryCode: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const activitiesInfo = [
    "All Activities",
    "summer",
    "fall",
    "winter",
    "spring",
  ];

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch, showForm]);

  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = "Name activity is required";
    if (!input.season) errors.season = "Select a season";
    if (!input.difficulty) errors.difficulty = "Select from 1 to 5";
    if (!input.duration) errors.duration = "Select above 0";
    if (!input.countryCode.length)
      errors.countryCode = "Select at least one country";
    return errors;
  }
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleRadio(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleRange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleRangeDuration(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      countryCode: [...input.countryCode, e.target.value]
        .filter((country) => country !== "Select a country")
        .reduce((acc, item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
          return acc;
        }, []),
    });
    if (!input.countryCode.length) {
      setErrors({
        ...errors,
        countryCode: "",
      });
    }
  }

  function handleRemove(country) {
    setInput({
      ...input,
      countryCode: input.countryCode.filter((code) => code !== country),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivities(input));
    alert("Activity Created!");
    setInput({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countryCode: [],
    });
    setShowForm(!showForm);
  }

  const handleClose = (id) => {
    dispatch(removeActivity(id));
    alert("Activity removed");
    dispatch(getActivities());
  };

  const handleChangeOrder = (e) => {
    dispatch(filterActvBySeason(e.target.value));
  };

  return (
    <div
      style={{
        width: "100%",

        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        overflowY: "scroll",
      }}
    >
      {/* NavBar */}
      <div
        style={{
          width: "100%",
          height: "70px",
          margin: " 0 auto",
          backgroundColor: "blueviolet",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        Explore the activities
        {!showForm && (
          <div>
            <button onClick={() => setShowForm(!showForm)}>
              Make an Activity
            </button>
            <select
              disabled={typeof activities === "string"}
              style={{ textTransform: "uppercase" }}
              onChange={(e) => handleChangeOrder(e)}
            >
              {activitiesInfo.map((activity) => (
                <option value={activity}>{activity}</option>
              ))}
            </select>
          </div>
        )}
        <button onClick={() => history.push("/home/countries")}>
          {" "}
          Go back{" "}
        </button>
      </div>
      {/* Container Activities and Form */}
      <div
        style={{
          width: "90%",
          height: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          overflow: "auto",
        }}
      >
        {/* Activities */}
        {!showForm && (
          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "row",
              justifyContent: "start",
              gap: "4px",
              width: "100%",
              height: "100%",
              flexWrap: "wrap",
              overflowY: "scroll",
            }}
          >
            {typeof activities !== "string" &&
              activities &&
              activities.map((activity) => {
                return (
                  <ActivityCard
                    key={activity.id}
                    id={activity.id}
                    handleClose={handleClose}
                    name={activity.name}
                    difficulty={activity.difficulty}
                    duration={activity.duration}
                    season={activity.season}
                    Countries={activity.countries}
                  />
                );
              })}
            {typeof activities === "string" && (
              <div
                style={{
                  width: "100%",
                  minHeight: "80vh",
                  height: "100%",
                  overflowY: "scroll",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {activities}
              </div>
            )}
          </div>
        )}

        {/*------- beggining of form --------------------*/}
        {showForm && (
          <form
            style={{
              width: "95%",

              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              padding: "20px 0px",
              alignItems: "center",
              gap: "10px",
              minHeight: "500px",
              height: "100%",
              backgroundColor: "gray",
              margin: " 20px 0px",
            }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div
              style={{
                display: "flex",
                width: "80%",

                margin: "0 auto",
                justifyContent: "space-around",
                textCenter: "center",
                alignItems: "center",
              }}
            >
              <h3>New Activity</h3>
              <button
                style={{
                  height: "40px",
                  width: "60px",
                  backgroundColor: "lightblue",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  setShowForm(!showForm);
                  setInput({
                    name: "",
                    difficulty: 0,
                    duration: 0,
                    season: "",
                    countryCode: [],
                  });
                }}
              >
                X
              </button>
            </div>
            <div
              style={{
                width: "90%",
                height: "100%",
                margin: "0 auto",

                gap: "10px",
              }}
            >
              {/* Name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",

                  padding: "10px",
                  width: "90%",
                  margin: "auto",
                  justifyContent: "flex-start",
                }}
              >
                <label style={{ fontSize: "60%" }}>Name: </label>
                <input
                  type="text"
                  style={{
                    width: "60%",
                    margin: "auto",
                    padding: "6px",
                    borderRadius: "10px",
                    border: "none",
                  }}
                  value={input.name}
                  name="name"
                  placeholder="Activity"
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && (
                  <p
                    style={{
                      fontSize: "60%",
                      color: "red",
                      fontStyle: "bold",
                      width: "30%",
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              {/* Select Radio button  */}
              <div
                style={{
                  display: "flex",
                  width: "90%",
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "start",
                  marginTop: "20px",
                }}
              >
                <label htmlFor="" style={{ fontSize: "60%" }}>
                  Season :
                </label>
                {errors.season ? (
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {errors.season}
                  </p>
                ) : null}
                <div
                  style={{
                    width: "50%",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {seasons.map((season) => {
                    return (
                      <label
                        key={season}
                        htmlFor={season}
                        style={{ fontSize: "50%" }}
                      >
                        {season}
                        <input
                          type="radio"
                          value={season}
                          name="season"
                          onClick={(e) => handleRadio(e)}
                          style={{
                            padding: "4px",
                            width: "50%",
                            margin: "auto",
                            transform: "scale(1.2)",
                          }}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              {/* Select Difficulty  */}
              <div
                style={{
                  width: "90%",
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <h5 style={{ fontSize: "60%" }}>Difficulty</h5>
                <div style={{ display: "flex", width: "90%", margin: "auto" }}>
                  <label htmlFor={input.value}></label>
                  <input
                    style={{ width: "50%", margin: "auto" }}
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    name="difficulty"
                    defaultValue="0"
                    onInput={(e) => handleRange(e)}
                  ></input>
                </div>

                <p>{input.difficulty}</p>
                {errors.difficulty ? (
                  <p
                    style={{
                      fontSize: "60%",
                      color: "red",
                      marginLeft: "10px",
                    }}
                  >
                    {errors.difficulty}
                  </p>
                ) : null}
              </div>
              {/* Select Duration */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",

                  margin: "auto",
                  width: "90%",
                }}
              >
                <h5 style={{ fontSize: "60%" }}>Duration</h5>
                <div style={{ display: "flex", width: "90%", margin: "auto" }}>
                  <label htmlFor={input.value}></label>
                  <input
                    style={{ width: "50%", margin: "auto" }}
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    name="duration"
                    defaultValue="0"
                    onInput={(e) => handleRangeDuration(e)}
                  ></input>
                </div>
                <p>{input.duration}'</p>
                {errors.duration ? (
                  <p
                    style={{
                      fontSize: "60%",
                      color: "red",
                      marginLeft: "10px",
                    }}
                  >
                    {errors.duration}
                  </p>
                ) : null}
              </div>
              {/* Select Country  */}
              <div
                style={{
                  width: "90%",
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h5>Country</h5>
                <div style={{ width: "100%", padding: "0 10px" }}>
                  <select
                    onChange={(e) => handleSelect(e)}
                    style={{
                      width: "80%",
                      margin: "auto",
                      padding: "4px",
                    }}
                  >
                    <option>Select a country</option>
                    {countries?.map((country) => (
                      <option
                        key={country.cod3letras}
                        value={country.cod3letras}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.countryCode ? (
                  <p style={{ fontSize: "60%", color: "red" }}>
                    {errors.countryCode}
                  </p>
                ) : null}
              </div>
              {/* Show Contries */}

              <div>
                <ul
                  style={{
                    width: "80%",
                    margin: "auto",
                    display: "flex",
                    gap: "20px",
                    listStyle: "none",
                  }}
                >
                  {input.countryCode?.map((country) => (
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor: "blueViolet",
                      }}
                      key={country}
                    >
                      <li>{country}</li>
                      <button onClick={() => handleRemove(country)}>X</button>
                    </div>
                  ))}
                </ul>
              </div>

              {/* Button Create */}
              {input.name &&
                input.difficulty !== 0 &&
                input.duration !== 0 &&
                input.season &&
                input.countryCode.length >= 1 && (
                  <button type="submit">Create activity!</button>
                )}
            </div>
            {/*------- end of form ------------*/}
          </form>
        )}
      </div>
    </div>
  );
}

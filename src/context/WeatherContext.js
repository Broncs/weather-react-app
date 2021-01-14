import React, { createContext, useEffect, useReducer } from "react";
import { WeatherReducer } from "../reducers/WeatherReducer";

export const WeatherContext = createContext();

const initialState = {
  weather: {},
  location: {},
  query: "",
  error: false,
};

export const WeatherContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WeatherReducer, initialState);

  const api = {
    key: "706a03f142ba1c09c641ca8aa0053b9b",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const search = async (evt) => {
    try {
      if (evt.key === "Enter") {
        const response = await fetch(
          `${api.base}weather?q=${state.query}&units=metric&APPID=${api.key}&lang=pt_br`
        );
        const data = await response.json();

        if (data.cod !== "404") {
          dispatch({ type: "SET_ERROR", error: false });
          dispatch({ type: "SET_DATA", weather: data });
        } else {
          dispatch({ type: "SET_ERROR", error: true });
        }
        dispatch({ type: "SET_QUERY", query: "" });
      }
    } catch (error) {
      throw new Error("An error has occured in Buggy component!");
    }
  };

  const dataBuilder = (d) => {
    let months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Decembro",
    ];
    let days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  useEffect(() => {
    const showPosition = (position) => {
      dispatch({
        type: "SET_LOCATION",
        payload: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    try {
      const fetchByLocation = async () => {
        if (state.location.lat && state.location.long !== "undefined") {
          const response = await fetch(
            `${api.base}weather?lat=${state.location.lat}&lon=${state.location.long}&units=metric&appid=${api.key}&lang=pt_br`
          );
          const data = await response.json();
          dispatch({ type: "SET_DATA", weather: data });
        }
      };
      fetchByLocation();
    } catch (error) {
      throw new Error("An error has occured in Buggy component!");
    }
  }, [state.location, api.key, api.base]);

  return (
    <WeatherContext.Provider value={{ state, dispatch, dataBuilder, search }}>
      {children}
    </WeatherContext.Provider>
  );
};

import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const Location = () => {
  const { state, dataBuilder } = useContext(WeatherContext);
  return (
    <div className="location-box">
      <div className="location">
        {state.weather.name}, {state.weather.sys.country}
      </div>
      <div className="date">{dataBuilder(new Date())}</div>
    </div>
  );
};

export default Location;

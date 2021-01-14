import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const Weather = () => {
  const { state } = useContext(WeatherContext);

  return (
    <div className="weather-box">
      <div className="temp">{Math.round(state.weather.main.temp)}°C</div>
      <div className="weather">{state.weather.weather[0].description}</div>
      <div className="icon">
        <img
          src={`http://openweathermap.org/img/wn/${state.weather.weather[0].icon}@2x.png`}
          alt="weather"
        />
      </div>
    </div>
  );
};

export default Weather;

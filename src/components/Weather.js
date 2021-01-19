import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import humidade from "../assets/humidity.svg";
import vento from "../assets/wind.svg";
import fellslike from "../assets/temperature.svg";

const Weather = () => {
  const { state } = useContext(WeatherContext);

  return (
    <div className="weather-box">
      <div className="temp">
        {Math.round(state.weather.main.temp)}°C
        <div className="temp-status">
          <div className="icons-temp">
            <img src={humidade} alt="humidity" />
            <p>{state.weather.main.humidity}%</p>
          </div>
          <div className="icons-temp">
            <img src={vento} alt="wind" />
            <p>{state.weather.wind.speed} km/h</p>
          </div>
          <div className="icons-temp">
            <img src={fellslike} alt="fellslike" />
            <p>{state.weather.main.feels_like}°</p>
          </div>
        </div>
      </div>

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

import React from "react";

const Weather = ({ weather }) => {
  return (
    <div className="weather-box">
      <div className="temp">{Math.round(weather.main.temp)}°C</div>
      <div className="weather">{weather.weather[0].description}</div>
      <div className="icon">
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default Weather;

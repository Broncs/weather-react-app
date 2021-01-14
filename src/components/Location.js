import React from "react";

const Location = ({ weather, dataBuilder }) => {
  return (
    <div className="location-box">
      <div className="location">
        {weather.name}, {weather.sys.country}
      </div>
      <div className="date">{dataBuilder(new Date())}</div>
    </div>
  );
};

export default Location;

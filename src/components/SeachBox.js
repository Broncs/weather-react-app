import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const SeachBox = () => {
  const { state, dispatch, search } = useContext(WeatherContext);
  // error, setQuery, query, search;
  return (
    <div className="search-box">
      <input
        type="text"
        className={`${
          state.error ? "search-bar search-bar-error" : "search-bar"
        }`}
        placeholder="pesquisar..."
        value={state.query}
        onKeyPress={search}
        onChange={(e) => dispatch({ type: "SET_QUERY", query: e.target.value })}
      />
      {state.error && <p className="error-message">Cidade não encontrada</p>}
    </div>
  );
};

export default SeachBox;

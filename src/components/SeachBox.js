import React from "react";

const SeachBox = ({ error, setQuery, query, search }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        className={`${error ? "search-bar search-bar-error" : "search-bar"}`}
        placeholder="pesquisar..."
        value={query}
        onKeyPress={search}
        onChange={(e) => setQuery(e.target.value)}
      />
      {error && <p className="error-message">Cidade não encontrada</p>}
    </div>
  );
};

export default SeachBox;

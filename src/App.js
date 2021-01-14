import { useEffect, useState } from "react";

const api = {
  key: "706a03f142ba1c09c641ca8aa0053b9b",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [location, setLocation] = useState({});

  const search = async (evt) => {
    if (evt.key === "Enter") {
      const response = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      const data = await response.json();

      if (data.cod !== "404") {
        setError(false);
        setWeather(data);
      } else {
        setError(true);
      }
      setQuery("");
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
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchByLocation = async () => {
      if (location.lat && location.long !== "undefined") {
        const response = await fetch(
          `${api.base}weather?lat=${location.lat}&lon=${location.long}&units=metric&appid=${api.key}`
        );
        const data = await response.json();
        setWeather(data);
      }
    };
    fetchByLocation();
  }, [location]);

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className={`${
              error ? "search-bar search-bar-error" : "search-bar"
            }`}
            placeholder="pesquisar..."
            value={query}
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
          />
          {error && <p className="error-message">Cidade não encontrada</p>}
        </div>

        {typeof weather.main != "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dataBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

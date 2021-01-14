import { useEffect, useState } from "react";
import Location from "./components/Location";
import SeachBox from "./components/SeachBox";
import Weather from "./components/Weather";

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
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=pt_br`
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
          `${api.base}weather?lat=${location.lat}&lon=${location.long}&units=metric&appid=${api.key}&lang=pt_br`
        );
        const data = await response.json();
        setWeather(data);
        console.log(data);
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
        <SeachBox
          error={error}
          setQuery={setQuery}
          query={query}
          search={search}
        />

        {typeof weather.main != "undefined" ? (
          <>
            <Location weather={weather} dataBuilder={dataBuilder} />
            <Weather weather={weather} />
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

import { useContext } from "react";
import Location from "./components/Location";
import SeachBox from "./components/SeachBox";
import Weather from "./components/Weather";
import { WeatherContext } from "./context/WeatherContext";

function App() {
  const { state } = useContext(WeatherContext);

  return (
    <div
      className={
        typeof state.weather.main != "undefined"
          ? state.weather.main.temp > 16
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <SeachBox />

        {typeof state.weather.main != "undefined" ? (
          <>
            <Location />
            <Weather />
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

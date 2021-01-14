const api = {
  key: "706a03f142ba1c09c641ca8aa0053b9b",
  base: "https://api.openweathermap.org/data/2.5",
};

function App() {
  const dataBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="search..." />
        </div>
        <div className="location-box">
          <div className="location">New york city, US</div>
          <div className="date">{dataBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">15?C</div>
          <div className="weather">Sunny</div>
        </div>
      </main>
    </div>
  );
}

export default App;

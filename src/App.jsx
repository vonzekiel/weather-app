import { useState, useEffect } from "react";
import { useLocalStorageState, formatDay, getWeatherIcon } from "./utils/utils";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useLocalStorageState({}, "weather");
  const [loading, setLoading] = useState(false);

  const {
    temperature_2m_Max: max = [],
    temperature_2m_Min: min = [],
    dates = [],
    weathercode: codes = [],
  } = weather || {};

  useEffect(
    function () {
      async function fetchWeather(city) {
        try {
          setLoading(true);

          const res = await fetch(`http://localhost:5093/weather/${city}`);
          const text = await res.text();
          const data = text ? JSON.parse(text) : {};
          setWeather(data.weather || {});
        } catch (err) {
          console.error("Failed to fetch weather data:", err);
        } finally {
          setLoading(false);
        }
      }

      if (city.length < 3) return;

      fetchWeather(city);
    },
    [city, setWeather]
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-200 p-8 rounded shadow-md">
        <h1 className="text-5xl text-center text-slate-900 font-mono font-semibold">
          Weekly Weather
        </h1>
        <div className="flex justify-center mt-5">
          <input
            type="text"
            placeholder="Enter a City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 shadow-md rounded w-fit"
          />
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {weather && (
          <div className="flex justify-between p-7 gap-4">
            {dates.map((date, i) => (
              <div
                key={date}
                className="text-center bg-white rounded-md shadow-lg p-5"
              >
                <img src={getWeatherIcon(codes.at(i))} alt="weather" />
                <p className="font-mono text-xl">{formatDay(date)}</p>
                <p className="text-blue-700">
                  {Math.floor(min.at(i))}&deg; &mdash;{" "}
                  <strong className="font-semibold text-red-500">
                    {Math.ceil(max.at(i))}&deg;
                  </strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

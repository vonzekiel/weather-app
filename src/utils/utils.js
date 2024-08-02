import { useState, useEffect } from "react";
import Cloudy from "../assets/icons/Cloudy.svg";
import Rain from "../assets/icons/Rain.svg";
import Snow from "../assets/icons/Snow.svg";
import Sunny from "../assets/icons/Sunny.svg";
import Thunderstorm from "../assets/icons/Thunderstorm.svg";
import Foggy from "../assets/icons/Foggy.svg";
import PartlyCloudy from "../assets/icons/PartlyCloudy.svg";
import SlightlyCloudy from "../assets/icons/SlightlyCloudy.svg";
import Drizzle from "../assets/icons/Drizzle.svg";
import SevereThunderStorm from "../assets/icons/SevereThunderStorm.svg";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

export function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], Sunny],
    [[1], SlightlyCloudy],
    [[2], PartlyCloudy],
    [[3], Cloudy],
    [[45, 48], Foggy],
    [[51, 56, 61, 66, 80], Drizzle],
    [[53, 55, 63, 65, 57, 67, 81, 82], Rain],
    [[71, 73, 75, 77, 85, 86], Snow],
    [[95], Thunderstorm],
    [[96, 99], SevereThunderStorm],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

export function formatDay(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
}

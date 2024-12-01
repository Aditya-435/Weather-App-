import React, { useEffect, useState } from "react";
import a01d from "../assets/MainWeatherIcons/a01d.png";
import a01n from "../assets/MainWeatherIcons/a01n.png";
import u00d from "../assets/MainWeatherIcons/u00d.png";

// Add all other imports as needed.

const Primarydata = ({ mainData, clickName }) => {
  const [currentday, setCurrentDay] = useState("");
  const [currenttime, setCurrentTime] = useState("");
  const [tempF, setTempF] = useState("");

  const getDayTime = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const day = weekday[date.getDay()];
    const time = `${date.getHours()}:${date.getMinutes()}`;
    setCurrentDay(day);
    setCurrentTime(time);
  };

  useEffect(() => {
    getDayTime();
    TempCelcToFahren();
  }, [clickName]);

  const TempCelcToFahren = () => {
    const fahren = (mainData.temp * 1.8 + 32).toFixed(2);
    setTempF(fahren);
  };

  const WIcons = {
    a01d,
    a01n,
    u00d, // Default icon
    // Add other icons as needed.
  };

  const mainWIcon = WIcons[mainData.weather.icon] || u00d;

  return (
    <div className="w-[80%] lg:w-[80%] sm:w-[90%] py-2 lg:py-2 xs:py-2 sm:py-4 sm:p-0 flex flex-col lg:flex-col sm:flex-row xs:flex-col items-start lg:items-start xs:items-start sm:items-center justify-between gap-3 mt-3">
      <img
        src={mainWIcon}
        alt="Weather Icon"
        className="max-h-40 object-cover"
      />
      <h1 className="text-6xl lg:text-6xl font-[500] font-Popin mt-4 md:text-7xl">
        {clickName === "cel" ? mainData.temp : tempF}
        <sup className="text-4xl font-[500] font-Popin">
          {clickName === "cel" ? "°C" : "°F"}
        </sup>
      </h1>
      <p className="md:text-[24px] lg:text-[18px] text-[18px]">
        {currentday}
        <span className="text-[#959595] ml-2">{currenttime}</span>
      </p>
    </div>
  );
};

export default Primarydata;

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Primarydata from "./Primarydata";
import Secondarydata from "./Secondarydata";
import Uvindex from "./Uvindex";
import WindStatus from "./WindStatus";
import SunTime from "./SunTime";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import AirQuality from "./AirQuality";

const Main = () => {
  const api_key = "5c8fea751bfc455396e3e26f262b42b4"; // Replace with your Weather API key

  const [wdata, setWdata] = useState({
    temp: 0,
    weather: {
      icon: "",
      description: "",
    },
  });
  const [inputValue, setInputValue] = useState(""); // Search input value
  const [search, setSearch] = useState("Mumbai"); // Default city
  const [clickName, setClickName] = useState("cel");
  const [celbtnactive, setCelBtnActive] = useState(true);
  const [fahbtnactive, setFahBtnActive] = useState(false);

  // Fetch weather data from API
  const fetchAPI = async () => {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${search}&key=${api_key}`
      );
      const result = await response.json();
      if (result && result.data && result.data.length > 0) {
        const data = result.data[0];
        setWdata(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Trigger the API call when the "search" state changes
  useEffect(() => {
    if (search) {
      fetchAPI();
    }
  }, [search]);

  // Handle "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearch(inputValue.trim()); // Update search state
    }
  };

  // Handle search button click
  const handleSearchButtonClick = () => {
    setSearch(inputValue.trim()); // Update search state
  };

  const celclick = () => {
    setClickName("cel");
    setCelBtnActive(true);
    setFahBtnActive(false);
  };

  const fahclick = () => {
    setClickName("fah");
    setCelBtnActive(false);
    setFahBtnActive(true);
  };

  return (
    <div className="Main w-screen h-screen bg-[#C1C2C6] lg:p-4 p-4 xs:p-0 sm:p-0 flex justify-center items-center">
      <div className="container w-[80%] lg:w-[80%] xs:w-full sm:w-full h-[90%] lg:h-[90%] xs:h-full sm:h-full bg-[#F6F6F8] rounded-[24px] lg:rounded-[24px] xs:rounded-none sm:rounded-none xs:flex-col sm:flex-col flex flex-row lg:flex-row md:overflow-y-scroll overflow-y-scroll lg:overflow-hidden xs:overflow-y-scroll sm:overflow-y-scroll pb-0 lg:pb-0 sm:pb-4">
        {/* Left Column */}
        <div className="left-col w-[30%] lg:w-[30%] xs:w-full sm:w-full h-full bg-[#FFFFFF] pl-10 py-4 flex flex-col justify-between items-start gap-4">
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <input
              type="text"
              className="w-full p-4 border rounded-full"
              placeholder="Enter city"
              aria-label="Search city"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress} // Handle Enter key
            />
            {/* Search Button */}
            <button
              onClick={handleSearchButtonClick}
              className="p-3 bg-black text-white rounded-full hover:bg-[#FFCE54] transition duration-300"
              aria-label="Search"
            >
              Search
            </button>
          </div>
          <Primarydata mainData={wdata} clickName={clickName} />
          <Secondarydata mainData={wdata} />
        </div>

        {/* Right Column */}
        <div className="right-col w-[70%] lg:w-[70%] xs:w-full sm:w-full h-full bg-transparent flex flex-col justify-between items-stretch gap-5 p-4 lg:p-4 sm:p-2">
          <div className="top-row w-full h-[60px] flex justify-between items-center px-4 pt-2 xs:mb-4 sm:mb-4">
            <h2 className="font-Popin text-2xl xs:text-xl sm:text-2xl font-[500]">
              Today&apos;s Highlights
            </h2>
            <div className="flex gap-2 items-center">
              <button
                onClick={celclick}
                className={`w-[40px] h-[40px] flex justify-center items-center font-Popin text-[18px] font-[500] shadow-[0_0_8px_#64646f10] ${
                  celbtnactive ? "bg-black text-white" : "bg-white text-black"
                } rounded-full`}
              >
                °C
              </button>
              <button
                onClick={fahclick}
                className={`w-[40px] h-[40px] flex justify-center items-center font-Popin text-[18px] font-[500] shadow-[0_0_8px_#64646f10] ${
                  fahbtnactive ? "bg-black text-white" : "bg-white text-black"
                } rounded-full`}
              >
                °F
              </button>
            </div>
          </div>
          <div className="bottom-row w-full flex-1 p-2 grid grid-cols-3 lg:grid-cols-3 xs:grid-cols-1 sm:grid-cols-2 xs:gap-6 sm:gap-8 place-items-center md:place-content-stretch">
            <Uvindex mainData={wdata} />
            <WindStatus mainData={wdata} />
            <SunTime mainData={wdata} />
            <Humidity mainData={wdata} />
            <Visibility mainData={wdata} />
            <AirQuality mainData={wdata} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

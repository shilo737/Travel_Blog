import axios from "axios";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import sun from "../../../assets/sunny.json";
import sunclouds from "../../../assets/sunclouds.json";
import rain from "../../../assets/rain.json";

const Weather = ({ postInfo }) => {
  const [data, setData] = useState({});

  const doApi = async (_location) => {
    if (postInfo.location) {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${_location}&units=metric&appid=4c6546d6096441b7896cc92a6fb2c9f6`
      );
      setData(data);
    }
  };

  useEffect(() => {
    doApi(postInfo.location);
  }, [postInfo.location]);

  return (
    <div className="flex items-center justify-center text-white">
      <div className="text-center md:text-left mx-auto bg-gradient-to-br from-indigo-300 to-blue-900 rounded-lg p-8 md:p-16 shadow-xl w-full lg:w-auto">
        <div className="top">
          <div className="location">
            <p className="text-xl md:text-2xl mb-1">{data.name}</p>
            {data.sys ? <p className="text-lg">{data.sys.country}</p> : null}
          </div>
          <div className="temp mt-4 md:mt-8">
            {data.main ? (
              <p className="text-5xl md:text-6xl font-bold italic">{data.main.temp.toFixed()}°C</p>
            ) : null}

            {data.main && (
              <Lottie
                className="w-36 md:w-52 mx-auto md:mx-0"
                animationData={
                  data.main.temp.toFixed() > 25
                    ? sun
                    : data.main.temp.toFixed() > 17
                    ? sunclouds
                    : rain
                }
              />
            )}
          </div>
          <div className="description mt-4 md:mt-8 text-xl md:text-3xl">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            <p>Clouds</p>
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom mt-8 md:mt-12 bg-gradient-to-br from-green-300 to-blue-900 p-4 md:p-8 rounded-lg">
            <div className="feels">
              {data.main ? (
                <p className="font-bold text-lg md:text-xl">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="font-bold text-lg md:text-xl">{data.main.humidity} %</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="font-bold text-lg md:text-xl">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;

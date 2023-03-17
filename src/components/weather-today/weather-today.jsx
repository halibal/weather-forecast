import moment from "moment";
import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { ForecastDailyWeather } from "../";
import {
    getForecastDataWithCoords,
    getWeatherDataWithCoords,
} from "../../api/openWeatherApi";
import { useStore } from "../../context/store-context";
import { setForecast, setWeather } from "../../context/weather/weather-actions";
import { handleError, handlePosition } from "../../utils/navigatorGeoLocation";
import "./weather-today.scss";

const WeatherToday = () => {
    const [coords, setCoords] = useState("");
    const { dispatchWeather, weatherState } = useStore();
    const { weather, forecast } = weatherState;

    const getLocationFromUser = () => {
        console.log("burasi da calisti " + new Date().getSeconds());
        if (navigator.geolocation && !coords) {
            navigator.geolocation.getCurrentPosition(
                (position) => handlePosition(position, setCoords),
                (error) => handleError(error)
            );
        }
    };

    console.log(coords);

    const checkWeather = Object.keys(weather).length > 3;

    const loadWeatherInformationWithCoords = async () => {
        try {
            if (coords) {
                const weatherResp = await getWeatherDataWithCoords(
                    coords.lat,
                    coords.lon
                );
                const forecastResp = await getForecastDataWithCoords(
                    coords.lat,
                    coords.lon
                );
                dispatchWeather(setWeather(weatherResp));
                dispatchWeather(setForecast(forecastResp));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getLocationFromUser();
    }, []);

    useEffect(() => {
        if (coords) {
            console.log("coords useffect: " + new Date().getSeconds())
            loadWeatherInformationWithCoords();
        }
    }, [coords]);

    return (
        <>
            {Object.keys(weather).length !== 0 && (
                <div className="weather-today-container">
                    {Object.keys(weather).length === 0 ||
                    weather.cod === "404" ? (
                        <div className="warning">
                            {weather.cod && (
                                <>
                                    *{weather.message}. <br />
                                </>
                            )}

                            <span>
                                TRY WRITING THE CITY NAME AS ACCURATE AS
                                POSSIBLE. <br /> I.E. INSTEAD OF "NEWYORK", TRY
                                "NEW YORK"
                            </span>
                        </div>
                    ) : weather.cod === 429 ? (
                        <div className="warning">
                            There is a problem due to the volume of the
                            requests.
                        </div>
                    ) : (
                        <>
                            <div className="location-weather">
                                <h1>
                                    {weather?.name}, {weather?.sys?.country}
                                </h1>
                                <h3>
                                    {" "}
                                    {moment(new Date()).format("dddd DD MMMM")}
                                </h3>
                            </div>
                            <div className="weather-info-container">
                                <div className="weather-image-container">
                                    <div className="weather-icon">
                                        {checkWeather ? (
                                            <img
                                                src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                                                alt=""
                                            />
                                        ) : (
                                            <DotLoader
                                                color="#fda700"
                                                size={100}
                                            />
                                        )}
                                    </div>
                                    <div className="degree-container">
                                        <p>
                                            {weather?.main?.temp.toFixed()}
                                            &deg;
                                        </p>
                                        <p>
                                            {checkWeather &&
                                                weather?.weather[0].main}
                                        </p>
                                    </div>
                                </div>
                                <div className="vertical-line"></div>
                                <div className="daily-weather-info">
                                    <div className="info-bigger-container">
                                        <div className="info-small-container">
                                            <p>
                                                {weather?.main?.temp_max.toFixed()}
                                                &deg;
                                            </p>
                                            <p>High</p>
                                        </div>
                                        <div className="info-small-container">
                                            <p>
                                                {weather?.wind?.speed.toFixed()}
                                                mph
                                            </p>
                                            <p>Wind</p>
                                        </div>
                                        <div className="info-small-container">
                                            <p>
                                                {moment(
                                                    weather?.sys?.sunrise * 1000
                                                ).format("HH:mm")}
                                            </p>
                                            <p>Sunrise</p>
                                        </div>
                                    </div>
                                    <div className="info-bigger-container">
                                        <div className="info-small-container">
                                            <p>
                                                {weather?.main?.temp_min.toFixed()}
                                                &deg;
                                            </p>
                                            <p>Low</p>
                                        </div>
                                        <div className="info-small-container">
                                            <p>
                                                {weather?.main?.humidity.toFixed()}
                                                %
                                            </p>
                                            <p>Rain</p>
                                        </div>
                                        <div className="info-small-container">
                                            <p>
                                                {moment(
                                                    weather?.sys?.sunset * 1000
                                                ).format("HH:mm")}
                                            </p>
                                            <p>Sunset</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="forecast-overall-container">
                                <h3>Next 5 days</h3>
                                <div className="forecast-container">
                                    {forecast ? (
                                        forecast.map((data, index) => {
                                            return (
                                                <ForecastDailyWeather
                                                    key={index}
                                                    {...data}
                                                />
                                            );
                                        })
                                    ) : (
                                        <DotLoader />
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default WeatherToday;

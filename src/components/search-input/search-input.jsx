import React, { useState } from "react";
import {
    getForecastDataWithCityName,
    getWeatherDataWithLocation,
} from "../../api/openWeatherApi";
import { SearchIcon } from "../../assets/img";
import { useStore } from "../../context/store-context";
import { setForecast, setWeather } from "../../context/weather/weather-actions";
import "./search-input.scss";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { dispatchWeather } = useStore();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const respWeatherData = await getWeatherDataWithLocation(search);
            console.log(respWeatherData);
            dispatchWeather(setWeather(respWeatherData));
            const respForecastData = await getForecastDataWithCityName(search);
            dispatchWeather(setForecast(respForecastData));
            setSearch("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="search-input-container" onSubmit={handleFormSubmit}>
            <input
                className="search"
                type="text"
                placeholder="Search Cities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
            />
            <button type="submit">
                <img src={SearchIcon} alt="search icon" />
            </button>
        </form>
    );
};

export default SearchInput;

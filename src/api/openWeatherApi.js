import { settings } from "../utils/settings";

// WEATHER INFO

export const getWeatherDataWithLocation = async (city, country = "", units = "metric") => {
    const weatherData = await fetch(
        `${settings.dataApiUrl}/weather?q=${city},${country}&units=${units}&appid=${import.meta.env.VITE_REACT_APP_API_KEY_OPEN_WEATHER}`
    )
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
    return weatherData;
};

export const getWeatherDataWithCoords = async (lat, lon, units = "metric") => {
    const weatherData = await fetch(
        `${settings.dataApiUrl}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${import.meta.env.VITE_REACT_APP_API_KEY_OPEN_WEATHER}`
    )
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
    return weatherData;
};

// FORECAST

export const getForecastDataWithCoords = async (lat, lon, units = "metric") => {
    const forecastData = await fetch(`${settings.dataApiUrl}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${import.meta.env.VITE_REACT_APP_API_KEY_OPEN_WEATHER}`)
        .then((resp) => resp.json())
        .then(data => {
            let fiveDaysArr = [];
            if (data.list) {
                for (let i = 0; i < data.list.length; i = i + 9) {
                    fiveDaysArr.push(data.list[i]);
                }
            }
            return fiveDaysArr;
        })
    return forecastData;
};



export const getForecastDataWithCityName = async (city, country = "", units = "metric") => {
    const forecastData = await fetch(
        `${settings.dataApiUrl}/forecast?q=${city},${country}&units=${units}&appid=${import.meta.env.VITE_REACT_APP_API_KEY_OPEN_WEATHER}`

    )
        .then((resp) => resp.json())
        .then((data) => {
            let fiveDaysArr = [];
            if (data.list) {
                for (let i = 0; i < data.list.length; i = i + 9) {
                    fiveDaysArr.push(data.list[i]);
                }
            }
            return fiveDaysArr;
        });
    return forecastData;
};
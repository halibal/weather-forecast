import { types } from "../types";

export const setWeather = (value) => ({
    type: types.SET_WEATHER,
    payload: value
});

export const setForecast = (value) => ({
    type: types.SET_FORECAST,
    payload: value
});
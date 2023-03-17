import { types } from "../types";
import { weatherInitialState } from "./weather-initial-state";

export const weatherReducer = (state = weatherInitialState, action) => {
    if (action.type === types.SET_WEATHER) {
        return {
            ...state,
            weather: action.payload
        }
    } else if (action.type === types.SET_FORECAST) {
        return {
            ...state,
            forecast: action.payload
        }
    }

    return state;
}
import { createContext, useContext, useReducer } from "react";
import { weatherInitialState } from "./weather/weather-initial-state";
import { weatherReducer } from "./weather/weather-reducer";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
    const [weatherState, dispatchWeather] = useReducer(
        weatherReducer,
        weatherInitialState
    );

    return (
        <StoreContext.Provider
            value={{
                weatherState,
                dispatchWeather,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;

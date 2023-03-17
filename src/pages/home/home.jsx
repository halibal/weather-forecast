import React, { useEffect, useState } from "react";
import { Loading, SearchInput, Spacer, WeatherToday } from "../../components";
import { useStore } from "../../context/store-context";
import { allBackgrounds } from "../../utils/allBackgrounds";
import "./home.scss";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const { weatherState } = useStore();
    const { weather } = weatherState;

    const bg =
        (Object.keys(weather).length > 0 && weather.cod >= 500) ||
        weather.cod < 400
            ? allBackgrounds["Bg" + weather?.weather[0].icon]
            : allBackgrounds.BgAll;

    const styles = {
        backgroundImage: `url("${bg}")`,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [weather.name]);

    // useEffect(() => {
    //     // Avoid setting the load to false when the data is fetched quickly without any delay.
    //     if (typeof weather?.cod !== "undefined") {
    //         setLoading(false);
    //     }
    // }, [weather]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="home-container">
                    <div className="cover" style={styles}></div>
                    <div className="main-container">
                        <SearchInput />
                        {weather.cod != "404" && <Spacer />}
                        <WeatherToday />
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;

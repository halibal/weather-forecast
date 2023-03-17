import moment from "moment";
import "./forecast-daily-weather.scss";

const ForecastDailyWeather = (props) => {
    const { dt, main, weather } = props;
    return (
        <div className="forecast-daily-weather-container">
            <p>{moment(dt * 1000).format("ddd")}</p>
            <img
                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt=""
            />
            <p>{main.temp.toFixed()}&deg;</p>
        </div>
    );
};

export default ForecastDailyWeather;

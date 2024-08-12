import { useState } from 'react';
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
    const [weatherInfo , setWeatherInfo] = useState({
        city : "Delhi",
        feelsLike : 12.12,
        temp : 23.4,
        tempMin : 23.5,
        tempMax : 42.2,
        humidity : 12,
        weather : "haze"
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div style={{textAlign : "center"}}>
            <h1>Weather App</h1>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}
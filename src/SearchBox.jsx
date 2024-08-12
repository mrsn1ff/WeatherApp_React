import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SearchBox.css";
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

console.log("API_URL:", API_URL);
console.log("API_KEY:", API_KEY);

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city : city,
                temp : jsonResponse.main.temp,
                tempMin : jsonResponse.main.temp_min,
                tempMax : jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feels_like,
                weather : jsonResponse.weather[0].description,
            }
            console.log(result);
            return result;
        }catch(err){
           throw err;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
        setError(false);
    };

    let handleSubmit = async (evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                id="city" 
                label="City Name" 
                variant="outlined" 
                required 
                value={city}
                onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
                { error && <p style={{color: "red"}}>No such place is exist!!</p>}
            </form>
        </div>
    );
} 
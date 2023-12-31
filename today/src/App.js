import { useState } from 'react';
import './App.css';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import CurrentWeather from './components/current/current-weather';
import Search from './components/search';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeather = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeather, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.lable, ...weatherResponse });
        setForecast({ city: searchData.lable, ...forecastResponse })

      })
      .catch((err) => console.log(err));
  }

 

  return (
    <div className="container">

      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
       {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;

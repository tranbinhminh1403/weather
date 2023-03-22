import React, { useEffect } from 'react';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/currentWeather/current-weather';
import {  WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';
import axios from 'axios';
import Location from './components/currentLocation/current-location';
import DefaultWeather from './components/default/default-weather';
import DefaultForecast from './components/default/default-forecast';


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch,forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city: searchData.label, ...weatherResponse})
      setForecast({city: searchData.label, ...forecastResponse})
    }).catch((err) => console.log(err));
  }

  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude)
      })
      let currentLocationAPI = `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      axios.get(currentLocationAPI).then((response) => {
        setResponseData(response.data)
        console.log(response.data)
      })
    },[latitude,longitude]);

  return (
    <div className="container">
      <Location responseData={responseData}/>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather? <CurrentWeather data={currentWeather}/> : <DefaultWeather/> }
      {forecast? <Forecast data={forecast} /> : <DefaultForecast/>}
    </div>
  );
}

export default App;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { WEATHER_API_KEY, WEATHER_API_URL } from '../../api';

const DefaultWeather = () => {
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
    <div className="weather">
      <div className="top">
        {responseData.name&& (
        <div>
          <p className="city">{responseData.name}</p>
          <p className="weather-description">{responseData.weather[0].description}</p>
        </div>
        )}
        {responseData.weather && responseData.weather[0] && (
        <img
          alt="weather"
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${responseData.weather[0].icon}@2x.png`}
        />
        )}  
      </div>
      <div className="bottom">
        {responseData.main && (<p className="temperature">{Math.round(responseData.main.temp)}°C</p>)}
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            {responseData.main &&(
            <span className="parameter-value">
              {Math.round(responseData.main.feels_like)}°C
            </span>
            )}
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            {responseData.wind && (
            <span className="parameter-value">{responseData.wind.speed} m/s</span>
            )}
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            {responseData.main&& (
            <span className="parameter-value">{responseData.main.humidity}%</span>
            )}
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            {responseData.main&& (
            <span className="parameter-value">{responseData.main.pressure} hPa</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultWeather
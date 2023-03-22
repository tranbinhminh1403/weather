import React from 'react'
import { useState, useEffect } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../../api';
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel,  } from "react-accessible-accordion";
import axios from 'axios';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DefaultForecast = () => {
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongitude] = useState('');
    const [responseData, setResponseData] = useState({});

    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude)
        })
        let currentLocationAPI = `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        axios.get(currentLocationAPI).then((response) => {
          setResponseData(response.data)
          console.log(response.data)
        })
      },[latitude,longitude]);
  return (
<>
      <label className="title">Upcoming 7 days</label>
      <Accordion allowZeroExpanded>
        {responseData.list?.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>

                  <label className="description">{item.weather[0].description}</label>
                  <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default DefaultForecast
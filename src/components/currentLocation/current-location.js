import React from 'react'
import "./current-location.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import AirIcon from '@mui/icons-material/Air';

const Location = ({responseData}) => {
    return (
      <div className='weatherlocation'>
      {responseData.name && (
        <div className='set'>
          <LocationOnIcon/>
          <p className="locationcity">{responseData.name}</p>
        </div>
      )}
      {responseData.weather && responseData.weather[0] && (
        <div className="set">
          <FilterDramaIcon/>
          <p className="desc">{responseData.weather[0].main}</p>
        </div>
      )}
      {responseData.main && (
        <div className="set">
          <DeviceThermostatIcon/>
          <p className="temp">{Math.round(responseData.main.temp)}°C</p>
        </div>
      )}
      {responseData.wind && (
        <div className="set">
          <AirIcon/>
          <p className="temp">{responseData.wind.speed} m/s</p>
        </div>
      )}
    </div>
    )
}

export default Location
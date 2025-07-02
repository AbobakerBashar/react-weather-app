import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faWater  } from '@fortawesome/free-solid-svg-icons'

export default function GetWeather({ weatherInfo }) {
  const { city, humidity, windSpeed, temperature, conditionIconId, conditionIconAlt} = weatherInfo
  
  const conditionIconSrc = `https://openweathermap.org/img/wn/${conditionIconId}@2x.png`

  return (
    <div className="container">
      <img src={conditionIconSrc} alt={conditionIconAlt}
        className="condition-icon"
      />
      <div className="city-degree">
        <span className='degree'>{temperature}°c</span>
        <span className="city">{city}</span>
      </div>
      <div className="bottom">
        <div className="humidity">
          <FontAwesomeIcon 
          className='icon'
          icon={faWater}/>
          <div>
            <span>{humidity} %</span>
            <span>Humidity</span>
          </div>
        </div>
        <div className="wind">
          <FontAwesomeIcon 
          className='icon'
          icon={faWind}/>
          <div>
            <span>{windSpeed} m/s</span>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
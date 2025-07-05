import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import clsx from 'clsx'

export default function SetWeather(probs) {

  const [isLoading, setIsLoading] = useState(false)
  
  const getWeatherInfo = async city => {
    if (!city || isLoading) return
    setIsLoading(true)
    try {
      const API_KEY = import.meta.env.VITE_API_KEY
      const endpoin = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      const response = await axios(endpoin)
      const data = await response.data
      probs.setWeatherInfo({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        conditionIconId: data.weather[0].icon,
        conditionIconAlt: data.weather[0].description,
        isCityFound: true
      })
    } catch (error) {
        probs.setWeatherInfo(prevInfo => ({
          ...prevInfo,
          isCityFound: false,
          errorType: error.message
        }))
        setTimeout(() => {
          probs.setWeatherInfo(prevInfo => ({
            ...prevInfo,
            isCityFound: true
          }))
        }, 3000)
      
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWeatherInfo("kigali")
  }, [])

  function getCity(formData) {
    const city = formData.get("city").trim()
    if (!city)
      return
    getWeatherInfo(city)
  }

  function removeMessage() {
    probs.setWeatherInfo(prevInfo => ({
      ...prevInfo,
      isCityFound: true
    }))
  }

  return (
    <>
      <form action={getCity}>
        <input 
          type="text" 
          name="city" 
          placeholder="e.g London" 
          aria-label="Search for a city"
        />
        <button disabled={isLoading}>
      {isLoading ? 
            (<FontAwesomeIcon
              className='spinner'
              spin
              icon={faSpinner} />) 
           :(<FontAwesomeIcon icon={faSearch} />)
          }
        </button>
      </form>
      <div className={clsx({
        "error-message": true,
        "show-message": !probs.isCityFound
      })}>
        <FontAwesomeIcon
          className="x-mark" icon={faXmark}
          onClick={removeMessage}
        />
        {probs.errorType === "Network Error" ?
        <span>Please ! Check your connection.</span>
        : <span>Sorry! The city is not found.</span>  
        }
      </div>
    </>
  )
}
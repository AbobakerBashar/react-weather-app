import { useState } from "react"
import GetWeather from "./components/GetWeather"
import SetWeather from "./components/SetWeather"
import "./App.css"

export default function App() {

  const [weatherInfo, setWeatherInfo] = useState({
    humidity: 0,
    windSpeed: 0,
    temperature: 0,
    city: "",
    conditionIconId: "",
    conditionIconAlt: "",
    isCityFound: true,
    errorType: undefined
  })

  return (
    <main>
      <SetWeather
        isCityFound={weatherInfo.isCityFound}
        setWeatherInfo={setWeatherInfo}
        errorType={weatherInfo.errorType}
      />
      <GetWeather
        weatherInfo={weatherInfo}
      />
    </main>
  )
}


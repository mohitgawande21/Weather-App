import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function App() {

  const [cityRes, setCityRes] = useState({})

  const [url, setUrl] = useState('')

  let inputCityName = useSelector((state) => {
    return state.inputCity
  })

  const onClickCity = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&units=metric&APPID=${process.env.REACT_APP_API}`)
      const data = await res.json()
      setCityRes(data)
      setUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <>
      <div className="App">
        <Header onClickCity={onClickCity} />
        <WeatherCard onClickCity={onClickCity} inputCityName={inputCityName} cityRes={cityRes} url={url} />
      </div>
    </>
  );
}

export default App;

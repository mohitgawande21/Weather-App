import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FiveDayForecast from './components/FiveDayForecast'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
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
      toast.success('Weather Success!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error('City Not Found', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.message)
    }
  }
  return (
    <>
      <Router>
        <ToastContainer />
        <div className="App">
          <Header onClickCity={onClickCity} />
          <Routes>
            <Route path='/'
              element={<WeatherCard onClickCity={onClickCity} inputCityName={inputCityName} cityRes={cityRes} url={url} />
              } /> 
              <Route path='/:id' element={<FiveDayForecast inputCityName={inputCityName} url={url}/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

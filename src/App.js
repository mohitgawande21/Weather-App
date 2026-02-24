import Header from './components/Header'
// import WeatherCard from './components/WeatherCard'
import React, { useEffect, useState, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
// import FiveDayForecast from './components/FiveDayForecast'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
const FiveDayForecastLazy = React.lazy(() => import('./components/FiveDayForecast'))
const WeatherCardLazy = React.lazy(() => import('./components/WeatherCard'))
function App() {

  const [cityRes, setCityRes] = useState({})

  const [url, setUrl] = useState('')

  let inputCityName = useSelector((state) => {
    return state.inputCity
  })

  const onClickCity = async (val) => {
    inputCityName = val?.length ? val : inputCityName?.length ? inputCityName : 'london';
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&units=metric&APPID=${process.env.REACT_APP_API}`)
      const data = await res.json()
      setCityRes(data)
      setUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      if (data.cod === 404) {
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
      } else {
        toast.success('Weather Success!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
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

  useEffect(() => {
    onClickCity()
  }, [])
  return (
    <>
      <Router>
        <div className="App">
          <Header inputCityName={inputCityName} />
          <Routes>
            <Route path='/'
              element={<Suspense fallback={<div className="d-flex justify-content-center m-5">
                <div className="spinner-border text-warning m-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>}><WeatherCardLazy onClickCity={onClickCity} inputCityName={inputCityName} cityRes={cityRes} url={url} /></Suspense>
              } />
            <Route path='/:id' element={<Suspense fallback={<div className="d-flex justify-content-center m-5">
              <div className="spinner-border text-warning m-5" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}><FiveDayForecastLazy /> </Suspense>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

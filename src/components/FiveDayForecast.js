import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function FiveDayForecast({ inputCityName }) {

  const params = useParams()
  const [cityRes, setCityRes] = useState({})

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputCityName}&units=metric&appid=${process.env.REACT_APP_API}&cnt=5`)
        const data = await res.json()
        setCityRes(data)
        toast.success('Forecast Success!', {
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
      }
    })()
  }, [])

  return (
    <>
      <h3 className='text-center'>City - {inputCityName}</h3>
      <div className='d-flex flex-wrap justify-content-center'>
        {cityRes?.list?.map((item, ind) => {
          var date = new Date(item.dt * 1000).toLocaleString('en-us', { weekday: 'long' });
          return <div key={ind} className=" mx-1 card w-25 m-auto my-3" >
            <div className="card-body text-center">
              <h5 className="card-title">{date}</h5>
              <img className="card-img-top" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
              <div><strong className="card-text">{item?.main?.temp} °C</strong></div>
              <div><strong className="card-text">{item.weather[0].description}</strong></div>
            </div>
          </div>
        })}

      </div>
    </>
  )
}

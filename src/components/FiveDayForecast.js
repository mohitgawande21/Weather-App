import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
export default function FiveDayForecast() {

  const [cityRes, setCityRes] = useState([])
  const { id } = useParams()

  let check = useSelector((state) => {
    return state.Check
  })

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${id}&${!check ? "units=metric" : "units=imperial"}&appid=${process.env.REACT_APP_API}&cnt=5`)
        const data = await res.json()
        setCityRes(data)
        if (data.cod == 404) {
          toast.error('City Not Found', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
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
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (

    <>
      <br />
      <br />
      <ToastContainer />
      <h4 className='text-center my-3'>City - {id}</h4>
      <div className='d-flex flex-wrap justify-content-center my-3'>
        {cityRes?.list?.map((item, ind) => {
          return <div key={ind} className=" mx-1 card  m-auto my-1  bg-light bg-gradient " >
            <div className="card-body text-center shadow ">
              <h6 className="card-text">{new Date(item.dt * 1000).toUTCString()}</h6>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
              <div><strong className="card-text">{item?.main?.temp} {check ? '°F' : '°C'}</strong></div>
              <div><strong className="card-text">{item.weather[0].description}</strong></div>
            </div>
          </div>
        })}

      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function WeatherCard() {

    const [cityRes, setCityRes] = useState({})

    useEffect(() => {
        (async function () {
            try {
                const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&APPID=95e924b2ae8d8cf81615ea228645a040')
                const data = await res.json()
                setCityRes(data)
            } catch (err) {
                console.log(err)
            }
        })()

    }, [])
    return <>
        <div className="card w-25 m-auto my-3" >
            <a href='/'>
                <div className="card-body">
                    <h5 className="card-title">{new Date().toLocaleString('en-us', { weekday: 'long' })}</h5>
                    <img className="card-img-top" src={'https://openweathermap.org/img/wn/10d@2x.png'} />
                    <p className="card-text">{cityRes?.main?.temp} degree</p>
                    <p className="card-text">{cityRes?.weather[0]?.description}</p>
                </div>
            </a>
        </div>
    </>

}

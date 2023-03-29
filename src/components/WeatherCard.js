import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function WeatherCard() {

    const [cityRes, setCityRes] = useState({})
    const [url, setUrl] = useState('')
    useEffect(() => {
        (async function () {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&APPID=${process.env.REACT_APP_API}`)
                const data = await res.json()
                setCityRes(data)
                setUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            } catch (err) {
                console.log(err.message)
            }
        })()

    }, [])
    return <>
        <div className="card w-25 m-auto my-3" >
            <a href='/'>
                <div className="card-body">
                    <h5 className="card-title">{new Date().toLocaleString('en-us', { weekday: 'long' })}</h5>
                    <img className="card-img-top" src={url} />
                    <p className="card-text">{cityRes?.main?.temp} degree</p>
                    <p className="card-text">{cityRes?.weather[0]?.description}</p>
                </div>
            </a>
        </div>
    </>

}

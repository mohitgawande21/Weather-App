import React from 'react'
import { Link } from 'react-router-dom'
export default function WeatherCard({ inputCityName, url, cityRes }) {


    return <>
        <h5 className="card-body text-center ">Enter city name and submit to see the change of bellow card with live weather</h5>
        <div className="card w-25 m-auto my-3 " >
            <Link className='text-decoration-none' to={`/${inputCityName}`}>
                <div className="card-body text-center">
                    <h3 className='card-title'>{inputCityName}</h3>
                    <div className="card-text">{new Date().toLocaleString('en-us', { weekday: 'long' })}</div>
                    <img className="card-img-top" src={url} />
                    <p className="card-text">{cityRes?.main?.temp} °C</p>
                    <p className="card-text">{cityRes?.main?.temp ? cityRes.weather[0].description : ''}</p>
                </div>
            </Link>
        </div>
    </>

}

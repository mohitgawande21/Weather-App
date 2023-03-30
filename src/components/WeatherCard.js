import React from 'react'
import { Link } from 'react-router-dom'
export default function WeatherCard({ inputCityName, url, cityRes }) {


    return <>
    <h5 className="card-body text-center">Enter city name and submit to see the change of bellow card with live weather</h5>
        <div className="card w-25 m-auto my-3" >
            <Link to={`/${inputCityName}`}>
                <div className="card-body text-center">
                    <h3>{inputCityName}</h3>
                    <h5 className="card-title">{new Date().toLocaleString('en-us', { weekday: 'long' })}</h5>
                    <img className="card-img-top" src={url} />
                    <p className="card-text">{cityRes?.main?.temp} degree</p>
                    {/* <p className="card-text">{cityRes.weather[0].description}</p> */}
                </div>
            </Link>
        </div>
    </>

}

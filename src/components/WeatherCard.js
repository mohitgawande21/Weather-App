import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function WeatherCard({onClickCity,inputCityName,url,cityRes}) {
    

    return <>
        <div className="card w-25 m-auto my-3" >
            City Name - {inputCityName}
            <a href='/'>
                <div className="card-body">
                    <h5 className="card-title">{new Date().toLocaleString('en-us', { weekday: 'long' })}</h5>
                    <img className="card-img-top" src={url} />
                    <p className="card-text">{cityRes?.main?.temp} degree</p>
                    {/* <p className="card-text">{cityRes.weather[0].description}</p> */}
                </div>
            </a>
        </div>
    </>

}

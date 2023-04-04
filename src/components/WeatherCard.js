import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../src/hover.css'
import {onToggle} from '../Redux/ActionCreator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
export default function WeatherCard({ inputCityName, url, cityRes }) {
    const dispatch = useDispatch()
    inputCityName = inputCityName.length ? inputCityName : 'london';

    const [temp, setTemp] = useState(cityRes?.main?.temp)

    let check = useSelector((state) => {
        return state.Check
      })
      useEffect(()=>{
        if (!check) {
            let d = cityRes?.main?.temp
            setTemp(d)
        } else {
            let f = (cityRes?.main?.temp * (9 / 5) + 32)
            setTemp(f)
        }
      },[check])
    const changeUnit = () => {
        dispatch(onToggle(!check))
        if (check) {
            let d = cityRes?.main?.temp
            setTemp(d)
        } else {
            let f = (cityRes?.main?.temp * (9 / 5) + 32)
            setTemp(f)
        }
    }
    
    return <>
        <h5 className="card-body text-center ">Enter city name and submit to see the change of bellow card with live weather</h5>
        <div className=" card w-25 m-auto my-3 " >
            <div className="card-body text-center ">
                <h3 className='card-title '>{inputCityName}</h3>
                <div className="card-text">{new Date().toLocaleString('en-us', { weekday: 'long' })}</div>
                <img className="card-img-top" src={url} />
                <p className="card-text">{temp ? temp : cityRes?.main?.temp} {!check ? '°C' : '°F'} <span className="form-switch">
                    <input checked={check} onChange={changeUnit} className="form-check-input" type="checkbox" />
                </span>
                </p>
                <p className="card-text">{cityRes?.main?.temp ? cityRes.weather[0].description : ''}</p>
                <Link to={`/${inputCityName}`}>
                    <span>Five Forecast</span>
                </Link>
            </div>
        </div>
    </>

}

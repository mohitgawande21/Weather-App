import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../src/hover.css'
import { onToggle } from '../Redux/ActionCreator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
export default function WeatherCard({ inputCityName, url, cityRes }) {
    const dispatch = useDispatch()
    inputCityName = inputCityName.length ? inputCityName : 'london';

    const [temp, setTemp] = useState(0)

    let check = useSelector((state) => {
        return state.Check
    })
    useEffect(() => {
        if (!check) {
            let d = cityRes?.main?.temp
            setTemp(d)
        } else {
            let f = (cityRes?.main?.temp * (9 / 5) + 32)
            setTemp(f)
        }
    }, [cityRes?.main?.temp])
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

        <div className='d-flex justify-content-center  my-3 '>
            <div className="card mb-3 bg-light shadow" style={{ width: '500px' }}>
                <div className="row g-0">
                    <div className="col-md-4 d-flex justify-content-center">
                        <img src={url} alt={url} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text">{temp ? temp :cityRes?.main?.temp} {!check ? '°C' : '°F'}
                                <span className=" mx-1 form-switch">
                                    <input checked={check} onChange={changeUnit} className="form-check-input" type="checkbox" />
                                </span></h5>
                            <h5 className="card-title text">{inputCityName}</h5>
                            <p className="card-text"><small className="text-muted">{new Date().toLocaleString('en-us', { weekday: 'long' })}</small></p>
                            <p className="card-text">{cityRes?.main?.temp ? cityRes.weather[0].description : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}

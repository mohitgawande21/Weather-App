import React, { useEffect, useRef, useState } from 'react'
import '../../src/hover.css'
import { onToggle } from '../Redux/ActionCreator'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { onSubmit } from '../Redux/ActionCreator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import InputSuggest from './InputSuggest'
export default function WeatherCard({ inputCityName, url, cityRes, onClickCity }) {
    const dispatch = useDispatch()

    let inputCityNameRedux = useSelector((state) => {
        return state.inputCity
    })

    inputCityName = inputCityName?.length ? inputCityNameRedux : 'london';

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
    const inputCity = useRef('')
    return <>
        <div className='my-3'>
            <ToastContainer />
            <br />
            <br />
            <div className=' '>
                {/* <input className='border-0 rounded-top' onChange={(e) => { dispatch(onSubmit(inputCity.current.value)) }} ref={inputCity} placeholder='Enter city name' /> */}
                <div className='my-3 d-flex justify-content-center align-items-center'>
                    <InputSuggest inputCity={inputCity.current.value} inputComp={<input className='border-0 rounded-top' onChange={(e) => { dispatch(onSubmit(inputCity.current.value)) }} ref={inputCity} placeholder='Enter city name' />} />
                    {inputCity?.current?.value?.length ? <div className='mx-1' onClick={onClickCity} type="submit" ><FontAwesomeIcon icon={faSearch} /></div> : ''}
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center  my-3 '>
            <div className="card mb-3 bg-light shadow" style={{ width: '500px' }}>
                <div className="row g-0">
                    <div className="col-md-4 d-flex justify-content-center">
                        <img src={url} alt={url} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text">{temp ? temp : cityRes?.main?.temp} {!check ? '°C' : '°F'}
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

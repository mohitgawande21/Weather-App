import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { onSubmit } from '../Redux/ActionCreator'
import { Link } from 'react-router-dom'
import banner from './background.jpg'
import logo from './favicon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default function Header({ onClickCity }) {

    const dispatch = useDispatch()
    const inputCity = useRef('')

    const imgStyle = {
        position: "fixed",
        width: '100%',
        height: '100%',
        zIndex: -1,
        left: 0,
        top: 0,
    }
    let inputCityName = inputCity?.current.value ? inputCity?.current.value : 'london';
    return (
        <div>
            <div className='d-flex flex-wrap justify-content-between align-items-center p-1 '>
                <div className='d-flex align-items-center fixed-top bg-dark '>
                    <img className='mx-3' src={logo} width='50px' height='50px' />
                    <h6 className=' mx-3 text-white '>Weather App</h6>
                    <Link className='text-info mx-3 ml-3  ' to='/'>Home</Link>
                    <Link className='text-info mx-3 ' to={`/${inputCityName}`}>
                        <span>Five Day Forecast</span>
                    </Link>
                </div>

            </div>
            <img src={banner} style={imgStyle} />
            <div className='my-3'>
                <br />
                <br />
                <div className='my-3 d-flex justify-content-center align-items-center '>
                    <input className='border-0 rounded-top' onChange={(e) => { dispatch(onSubmit(inputCity.current.value)) }} ref={inputCity} placeholder='Enter city name' />
                    <div className=''>
                        {inputCity?.current?.value?.length ? <div className='mx-1' onClick={onClickCity} type="submit" ><FontAwesomeIcon icon={faSearch} /></div> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

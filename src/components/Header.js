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
        position: "absolute",
        width: '100%',
        height: '100%',
        zIndex: -1,
        left: 0,
        top: 0,

    }
    let inputCityName = inputCity?.current.value ? inputCity?.current.value : 'london';
    return (
        <div>
            <div className='bg-secondary d-flex flex-wrap justify-content-between align-items-center p-1 w-100'>
                <div className='d-flex align-items-center'>
                    <img src={logo} width='50px' height='50px' />
                    <h6 className='my-1 mx-3 text-white '>Weather App</h6>
                    <Link className='text-info  my-1 ml-3  flex-grow-1 ' to='/'>Home</Link>
                    <Link className='text-info  my-1 mx-2  flex-grow-1 ' to={`/${inputCityName}`}>
                        <span>Five Day Forecast</span>
                    </Link>
                </div>

            </div>
            <img src={banner} style={imgStyle} />
             <div>
                <div className="card-body text-center ">Enter city name and submit to see the change of bellow card with live weather</div>
                <div className='d-flex justify-content-center align-items-center '>
                    <input className='border-0 rounded-top' onChange={(e) => { dispatch(onSubmit(inputCity.current.value)) }} ref={inputCity} placeholder='Enter city name' />
                    <div className=''>
                        {inputCity?.current?.value?.length ? <div className='mx-1' onClick={onClickCity} type="submit" ><FontAwesomeIcon icon={faSearch} /></div> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

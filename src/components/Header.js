import React from 'react'
import { Link } from 'react-router-dom'
import banner from './background.jpg'
import logo from './favicon.png'
import '../hover.css'
export default function Header({ inputCityName }) {
    inputCityName = inputCityName?.length ? inputCityName : 'london';
    const imgStyle = {
        position: "fixed",
        width: '100%',
        height: '100%',
        zIndex: -1,
        left: 0,
        top: 0,
    }
    return (
        <div>
            <div className='d-flex flex-wrap justify-content-between align-items-center p-1 '>
                <div className='d-flex align-items-center fixed-top bg-dark '>
                    <Link className='text-info mx-3 ml-3  ' to='/'>
                        <div className=' hover-overlay'>
                            <img alt="logo" src={logo} width='50px' height='50px' />
                        </div>
                    </Link>
                    <Link className='text-info mx-3 ' to={`/${inputCityName}`}>
                        <span>Five Day Forecast</span>
                    </Link>
                </div>

            </div>
            <img alt="background" src={banner} style={imgStyle} />
        </div>
    )
}

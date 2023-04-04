import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { onSubmit } from '../Redux/ActionCreator'
import { Link } from 'react-router-dom'
import banner from './background.jpg'

export default function Header({ onClickCity }) {

    const dispatch = useDispatch()
    const inputCity = useRef('')

    const imgStyle={
        position:"absolute",
        width:'100%',
        height:'100%',
        zIndex:-1,
        left:0,
        top:0,

    }
    return (
        <div>
            <div className='bg-secondary d-flex flex-wrap justify-content-between align-items-center p-1 w-100'>
                <div className='d-flex'>
                    <h6 className='my-1 mx-3 text-white '>Weather App</h6>
                    <Link className='text-info  my-1 ml-3  flex-grow-1 ' to='/'>Home</Link>
                </div>
                <div className='d-flex align-items-center '>
                    <input onChange={(e) => { dispatch(onSubmit(inputCity.current.value)) }} ref={inputCity} placeholder='Enter city name' />
                    <div className=''>
                        <button onClick={onClickCity} type="submit" className="btn btn-success my-1 mx-2 rounded-0">Submit</button>
                    </div>
                </div>
            </div>
            <img src={banner} style={imgStyle}/>
        </div>
    )
}

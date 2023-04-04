import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { onSubmit } from '../Redux/ActionCreator'
import { Link } from 'react-router-dom'
export default function Header({ onClickCity }) {

    const dispatch = useDispatch()
    const inputCity = useRef('')
    return (
        <div>
            <div className='bg-secondary d-flex flex-wrap justify-content-center align-items-center p-1 w-100'>
                <h6 className='my-1 ml-3 text-white flex-grow-1 '>Weather App</h6>
                <Link className='text-info text-decoration-none my-1 ml-3  flex-grow-1 ' to='/'>Home</Link>
                <input onChange={(e) => { dispatch(onSubmit(inputCity.current.value)) }} ref={inputCity} placeholder='Enter city name' />
                <div className=''>
                    <button onClick={onClickCity} type="submit" className="btn btn-success my-1 mx-2 rounded-0">Submit</button>
                </div>
            </div>
        </div>
    )
}

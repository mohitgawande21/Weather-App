import React from 'react'

export default function Header({ onClickCity }) {


    return (
        <div>
            <div className='bg-secondary d-flex flex-wrap justify-content-center align-items-center p-1 w-100'>
                <h6 className='my-1 ml-3 text-white flex-grow-1 '>Weather App</h6>
                <input placeholder='Enter city name'/>
                <div className=''>
                    <button onClick={onClickCity} type="submit" className="btn btn-success my-1 mx-2 rounded-0">Submit</button>
                </div>
            </div>
        </div>
    )
}

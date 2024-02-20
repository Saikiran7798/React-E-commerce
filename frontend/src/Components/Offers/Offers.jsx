import React from 'react'
import './Offers.css'
import exclusive_img from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h2>Exclusive</h2>
            <h2>Offers For You</h2>
            <p>ONLY ON BEST SELLERS PRODUCT</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_img} alt='' />
        </div>
    </div>
  )
}

export default Offers
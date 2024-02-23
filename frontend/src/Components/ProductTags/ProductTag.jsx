import React from 'react'
import './ProductTag.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom'

const ProductTag = ({product}) => {
  return (
    <div className='productitem'>
        <Link to={'/'} className='link'>HOME</Link><img src={arrow_icon} alt='' /><Link to={`/${product.category}s`} className='link'>{product.category}</Link> <img src={arrow_icon} alt='' /> {product.name}
    </div>
  )
}

export default ProductTag
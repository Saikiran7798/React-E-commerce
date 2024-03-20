import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = ({ product, setErrorPage }) => {
    const { addToCart } = useContext(ShopContext)
    const checkCartError = () => {
        if (!localStorage.getItem('auth-token')) {
            setErrorPage();
        }
    }
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h2>{product.name}</h2>
                <div className="productdisplay-rating">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-prices">
                    <div className="productdisplay-prices-new">
                        ${product.new_price}
                    </div>
                    <div className="productdisplay-prices-old">
                        ${product.old_price}
                    </div>
                </div>
                <div className="productdisplay-description">
                    A lightweigh usually knitted, pullover shirt, closefitting and with a round neckline
                    nd short sleeves worn as undershirt outer garment.
                </div>
                <div className="productdisplay-size">
                    <h2>Select Size</h2>
                    <div className="productdisplay-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => {
                    checkCartError()
                    addToCart(product.id)
                }}>Add to Cart</button>
                <p className="productdisplay-category">
                    <span>Category: </span>{product.category}
                </p>
                <p className='productdisplay-category'>
                    <span>Tags: </span>Modern, latest
                </p>
            </div>
        </div>
    )
}

export default ProductDisplay
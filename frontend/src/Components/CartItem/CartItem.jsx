import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = () => {
    const { all_products, cartItems, removeFromCart, totalCartValue } = useContext(ShopContext)
    return (
        <div className='cartitem'>
            <div className="cartitem-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((item) => {
                return(
                    cartItems[item.id] > 0 ? 
                        <div key={item.id}>
                            <div className="cartitem-format-main cartitem-format">
                                <img src={item.image} alt="" className='carticon-product-icon' />
                                <p>{item.name}</p>
                                <p>${item.new_price}</p>
                                <button className='cartitem-quantity'>{cartItems[item.id]}</button>
                                <p>${item.new_price * cartItems[item.id]}</p>
                                <img src={remove_icon} alt="" onClick={() => removeFromCart(item.id)} className='cartitem-remove-icon' />
                            </div>
                            <hr />
                        </div>
                    : null)
            })}
            <div className="cartitem-down">
                <div className="cartitem-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Subtotal</p>
                            <p>${totalCartValue}</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <div className="cartitem-total-item">
                            <h3>Total</h3>
                            <h3>${totalCartValue}</h3>
                        </div>
                    </div>
                    <button>Proceed to Check out</button>
                </div>
                <div className="cartitem-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitem-promobox">
                        <input type='text' placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
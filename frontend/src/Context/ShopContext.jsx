import React, {createContext, useState} from "react";
import all_products from '../Components/Assets/all_product'

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    all_products.forEach((item) => {
        cart[item.id] = 0;
    })
    return cart;
}


const ShopContextProvider = ({children}) => {
    const [carItems, setCartItems] = useState(getDefaultCart())
    const [totalCartValue, setTotalCartValue] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const addToCart = (productId) => {
        setCartItems((prev) => ({
            ...prev,[productId]:prev[productId] + 1
        }))
        setCartTotal(cartTotal + 1)
        let prod_info = all_products.find((item) => item.id === Number(productId))
        setTotalCartValue(totalCartValue + prod_info.new_price)
    }
    const removeFromCart = (productId) => {
        setCartItems((prev) => ({
            ...prev,[productId]:prev[productId] - 1
        }))
        setCartTotal(cartTotal - 1)
        let prod_info = all_products.find((item) => item.id === Number(productId))
        setTotalCartValue(totalCartValue - prod_info.new_price)
    }
    console.log(carItems)

    const contextValue = {all_products , carItems, addToCart, removeFromCart, totalCartValue, cartTotal}
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

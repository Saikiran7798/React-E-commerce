import React, {createContext, useEffect, useState} from "react";
import axios from 'axios'

export const ShopContext = createContext(null)

const ShopContextProvider = ({children}) => {
    const [totalCartValue, setTotalCartValue] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [all_products, setAllProducts] = useState([])
    const [carItems, setCartItems] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allproducts')
                console.log(response.data)
                setAllProducts(response.data)
            } catch(error){
                console.log("Error Retieving Products")
            }
        }
        fetchProducts()
    },[])
    

    const addToCart = (productId) => {
        setCartItems((prev) => ({
            ...prev,[productId]: (prev[productId] ? prev[productId] + 1 : 1)
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

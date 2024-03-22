import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {
    const [totalCartValue, setTotalCartValue] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [all_products, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState({})

    useEffect(() => {
        callDetails()
    },[])

    const callDetails = async () => {
        const prods = await fetchProducts();
        const cart_data = await getDefaultCart();
        getDefaultCartTotal(cart_data, prods)
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/allproducts')
            setAllProducts(response.data)
            return response.data
        } catch (error) {
            console.log("Error Retieving Products")
            return null
        }
    }
    const getDefaultCart = async () => {
        if (localStorage.getItem('auth-token')) {
            const token = localStorage.getItem('auth-token')
            try {
                const response = await axios.get('http://localhost:4000/defaultCart', {
                    headers: {
                        'auth-token': token,
                    }
                },)
                setCartItems(response.data)
                setCartTotal(Object.keys(response.data).length)
                return response.data
            } catch (error) {
                setCartItems([])
                return []
            }
        }
        else {
            setCartItems([])
            return []
        }
    }
    const addToCart = async (productId) => {
        if (localStorage.getItem('auth-token')) {
            const token = localStorage.getItem('auth-token')
            const updatedCartItems = {
                ...cartItems, [productId]: (cartItems[productId] ? cartItems[productId] + 1 : 1)
            }
            try {
                console.log(updatedCartItems)
                await axios.post("http://localhost:4000/updateCart", {
                    data: updatedCartItems
                }, {
                    headers: {
                        'auth-token': token,
                    }
                })
                console.log("Cart_total is ", cartTotal)
                setCartTotal(cartTotal + 1)
                let prod_info = all_products.find((item) => item.id === Number(productId))
                setTotalCartValue(totalCartValue + prod_info.new_price)
            } catch (error) {
                console.log("Unable to add to Cart")
            }
            setCartItems(updatedCartItems)
        }
        else {
            setCartItems([])
        }
    }

    const removeFromCart = async (productId) => {
        if (localStorage.getItem('auth-token')) {
            const token = localStorage.getItem('auth-token')
            const old_object = { ...cartItems }
            if (old_object[productId] === 1) {
                console.log("i am here", old_object[productId])
                delete old_object[productId]
            }
            else {
                old_object[productId] -= 1
            }
            try {
                console.log(old_object)
                await axios.post("http://localhost:4000/updateCart", {
                    data: old_object
                }, {
                    headers: {
                        'auth-token': token,
                    }
                })
                setCartTotal(cartTotal - 1)
                let prod_info = all_products.find((item) => item.id === Number(productId))
                setTotalCartValue(totalCartValue - prod_info.new_price)
            } catch (error) {
                console.log("Unable to remove from Cart")
            }
            setCartItems(old_object)
        }
        else {
            setCartItems([])
        }
    }

    const getDefaultCartTotal = (cart_data, prods) => {
        let cart_total = 0;
        console.log("cart_data is ", cart_data)
        for (let key in cart_data) {
            const prod_info = prods.find((prod) => prod.id === Number(key))
            cart_total += cart_data[key]*prod_info.new_price
        }
        console.log("Value", cart_total)
        setTotalCartValue(cart_total)
    }

    const contextValue = { all_products, cartItems, addToCart, removeFromCart, totalCartValue, cartTotal }
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

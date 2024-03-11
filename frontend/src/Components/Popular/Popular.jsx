import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import axios from 'axios'

const Popular = () => {
    const [data_product, setDataProduct] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/popularWomen")
                setDataProduct(response.data)
            } catch (error) {
                console.log("Error Popular")
            }
        }
        fetchProducts()
    }, [])
    return (
        <div className='popular'>
            <h1>Popular in Women</h1>
            <hr />
            <div className="popular-item">
                {data_product.map((item, index) => {
                    return (
                        <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                            old_price={item.old_price} />
                    )
                })}
            </div>
        </div>
    )
}

export default Popular
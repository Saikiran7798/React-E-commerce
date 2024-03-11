import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import axios from 'axios'

const NewCollections = () => {
    const [new_collection, setnewCollection] = useState([])
    useEffect(() => {
        const fetchnewCollection = async () => {
            try {
                const response = await axios.get("http://localhost:4000/newCollections")
                setnewCollection(response.data)
            } catch (error) {
                console.log("Error New Collection")
            }
        }
        fetchnewCollection()
    }, [])
    return (
        <div className='new-collections'>
            <h2>New Collections</h2>
            <hr />
            <div className="collections">
                {new_collection.map((item, index) => {
                    return (
                        <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                            old_price={item.old_price} />
                    )
                })}
            </div>
        </div>
    )
}

export default NewCollections
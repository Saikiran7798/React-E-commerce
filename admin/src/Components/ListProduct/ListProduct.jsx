import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import axios from 'axios'
import cross_icon from '../../Assets/cross_icon.png'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([])
  const getAllProducts = async () => {
    try {
      const all_products = await axios.get('http://localhost:4000/allproducts')
      setAllProducts(all_products.data)
    } catch (error) {
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  const removeProduct = async (id, file_path) => {
    try{
      await axios.delete('http://localhost:4000/removeproduct',{
        data: {
          id:id,
          file_path:file_path,
        },
      })
      await getAllProducts()
    }catch(error){
      console.log("Unable to delete", error)
    }
  }
  return (
    <div className='listproduct'>
      <h2>All Products List</h2>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="lisproduct-allproducts">
        <hr />
        {allProducts.map((item, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img src={item.image} alt="" className='listproduct-product-icon' />
                <p>{item.name}</p>
                <p>${item.old_price}</p>
                <p>${item.new_price}</p>
                <p>{item.category}</p>
                <img onClick={() => {removeProduct(item.id, item.file_path)}} src={cross_icon} alt="" className='listproduct-remove-icon' />
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListProduct
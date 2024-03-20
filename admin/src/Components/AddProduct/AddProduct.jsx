import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../Assets/upload_area.svg'
import axios from 'axios'

const AddProduct = () => {
  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
    file_path: ""
  })

  const imageHandler = (event) => {
    setImage(event.target.files[0])
  }
  const changehandler = (event) => {
    setProductDetails({...productDetails, [event.target.name]: event.target.value})
  }

  const addProduct = async () => {
    let product = productDetails
    let formData = new FormData()
    formData.append('product',image)
    try{
      const response = await axios.post("http://localhost:4000/upload", formData)
      const data = response.data
      product.image = data.image_url
      product.file_path = data.file_path
    } catch(error){
    }
    try{
      const response = await axios.post("http://localhost:4000/addproduct", product)
      const data = response.data
      alert(`${data.name} Product is added succesfully`)
      setImage(false)
      setProductDetails({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
        file_path: ""
      })
    }catch(error){
    }
  }
  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changehandler} type="text" name="name" placeholder='Type Here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changehandler} type="text" name="old_price" placeholder='Type Here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changehandler} type="text" name="new_price" placeholder='Type Here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changehandler} name='category' className='addproduct-selector'>
          <option value='women'>Women</option>
          <option value='men'>Men </option>
          <option value='kid'>Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumbnail-img'/>
        </label>
        <input type="file" name="image" id="file-input" onChange={imageHandler} hidden/>
      </div>
      <button onClick={addProduct} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default AddProduct
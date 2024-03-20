import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import ProductTag from '../Components/ProductTags/ProductTag'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import remove_icon from '../Components/Assets/cart_cross_icon.png'
import './CSS/Product.css'

const Product = () => {
  const { all_products } = useContext(ShopContext)
  const [cartError, setCartError] = useState(false)
  const { productId } = useParams()
  const product = all_products.find((item) => item.id === Number(productId))
  const setErrorPage = () => {
    setCartError(true)
  }
  const removeErrorPage = () => {
    setCartError(false)
  }
  if (!product) {
    console.log("Hello")
    return <div>Loading....</div>
  }
  return (
    <div>
      {cartError ?
        <div className="modal">
          <div className="login-error">
            <p>Please login To Add to Cart</p>
            <img onClick={removeErrorPage} src={remove_icon} alt="" />
          </div>
        </div>
        : null}
      <ProductTag product={product} />
      <ProductDisplay setErrorPage={setErrorPage} product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}

export default Product
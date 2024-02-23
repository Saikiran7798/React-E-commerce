import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import ProductTag from '../Components/ProductTags/ProductTag'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const all_products = useContext(ShopContext)
  const {productId} = useParams()
  console.log("product id is", productId)
  console.log(all_products)
  const product = all_products.find((item) => item.id === Number(productId))
  console.log("peoduct in Product", product)
  return (
    <div>
      <ProductTag product = {product} />
      <ProductDisplay product ={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}

export default Product
import React, { useContext, useEffect, useMemo, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'


const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext)
  const [showNumber, setShowNumber] = useState(12)
  const cat_products = useMemo(() => {
    return all_products.filter((item) => item.category === props.category)
  }, [all_products, props.category])
  const [showProducts, setShowProducts] = useState([])
  const [showSort, setShowSort] = useState(false)

  const handleExploreClick = (event) => {
    event.preventDefault();
    if (showNumber + 12 > cat_products.length) {
      setShowNumber(cat_products.length)
    }
    else {
      setShowNumber(showNumber + 12)
    }

    console.log("Hello")
  }

  const handleSort = () => {
    setShowSort(!showSort)
  }
  const handleLTH = () => {
    showProducts.sort((a,b) => (a.new_price - b.new_price))
  }
  const handleHTL = () => {
    showProducts.sort((a,b) => (b.new_price - a.new_price))
  }
  useEffect(() => {
    setShowProducts(cat_products.slice(0, showNumber))
  }, [showNumber, cat_products])
  return (
    <div className='shopcategory'>
      <img className='shopcategory-banner' src={props.banner} alt='' />
      <div className="shopcategory-index-sort">
        <p>
          <span>Showing 1-{showNumber}</span> out of {cat_products.length} matches
        </p>
        <div onClick={handleSort} className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt='' />
          {showSort ? (<div className="sort">
            <button onClick={handleLTH}>Price: Low to High</button>
            <button onClick={handleHTL}>Price: High to Low</button>
          </div>) : null}
        </div>
      </div>
      <div className="shopcategory-products">
        {showProducts.map((item, index) => {
          return (
            <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
              old_price={item.old_price} />
          )
        })}
      </div>
      <button onClick={handleExploreClick} className="shopcategory-loadmore">
        Explore More
      </button>
    </div>
  )
}

export default ShopCategory
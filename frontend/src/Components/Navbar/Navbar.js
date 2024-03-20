import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/navbar_dropdown.png'

const Navbar = () => {

  const [menu, setMenu] = useState("shop")
  const [loginState, setLoginState] = useState("Login")
  const { cartTotal } = useContext(ShopContext)
  const menuRef = useRef(null)
  const location = useLocation();
  const dropdown_toggle = (event) => {
    menuRef.current.classList.toggle('nav-menu-visible')
    event.target.classList.toggle('open')
  }
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Shopper</p>
      </div>
      <img src={dropdown_icon} alt="" onClick={dropdown_toggle} className='nav-dropdown' />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => setMenu("mens")}><Link to='/mens'>Men</Link> {menu === "mens" ? <hr /> : null}</li>
        <li onClick={() => setMenu("womens")}><Link to='/womens'>Women</Link> {menu === "womens" ? <hr /> : null}</li>
        <li onClick={() => setMenu("kids")}><Link to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : null}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? <Link to='/login' state={{ reload: true }}><button onClick={() => {
          localStorage.removeItem('auth-token')
        }
        }>Logout</button></Link> : <Link to='/login' ><button>Login</button></Link>}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{cartTotal}</div>
      </div>
    </div >
  )
}

export default Navbar
import React from 'react'
import nav_logo from '../../Assets/nav-logo.svg'
import nav_profile from '../../Assets/nav-profile.svg'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt="" className='nav-logo'/>
        <img src={nav_profile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar
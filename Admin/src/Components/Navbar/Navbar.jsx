import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo_big.png'
import navProfile from '../../assets/male.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={navlogo} alt="" className="nav-logo" />
        <h1>SHOPPER <span>ADMIN PANNEL</span></h1>
      </div>
      <div className="navbar-right">
        <img src={navProfile} alt="" className='nav-profile'/>
      </div>
    </div>
  )
}

export default Navbar

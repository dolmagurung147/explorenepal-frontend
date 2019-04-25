import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <Link to="/home">Home </Link>
      <Link to="/login">Login/Logout </Link>
    </div>
  )
}

export default NavBar

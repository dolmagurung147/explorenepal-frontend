import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div>
      <Link to="/home">Home </Link>
      <Link to="/login">Login/Logout </Link>
      {props.loggedin ? loggedInNavBar() : null}
    </div>
  )
}

const loggedInNavBar = () => {
  return (
    <div>
      <Link to='/myAppointments'> My Appointments </Link>
      <Link to='/myProfile'> My Profile </Link>
      <Link to='/placesIVisited'> Places I have visited </Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedin: state.loggedin,
    whoIsLoggedIn: state.whoIsLoggedIn,
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(NavBar)

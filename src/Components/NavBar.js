import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div>
      <Link to="/home">Home </Link>
      <Link to="/login">Login/Logout </Link>
      {props.loggedin ? loggedInNavBar(props) : null}
    </div>
  )
}

const check = (props) => {
  if (props.whoIsLoggedIn === 'tourist') {
    return <Link to='/placesIVisited'> Places I have visited </Link>
  }
}


const loggedInNavBar = (props) => {
  return (
    <div>
      <Link to='/myAppointments'> My Appointments </Link>
      <Link to='/myProfile'> My Profile </Link>
      {props.whoIsLoggedIn ? check(props) : null}
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

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import * as actions from '../actions'

const NavBar = (props) => {
  return (
    <div>
      <Link to="/home">Home </Link>
      {props.loggedin ? <Link to='/home' onClick={() => logOut(props)}> Logout </Link> : <Link to="/login">Login/Signup</Link>}
      {props.loggedin ? loggedInNavBar(props) : null}
    </div>
  )
}

const logOut = (props) => {
  localStorage.removeItem('token')
  localStorage.removeItem('userType')
  props.logout()
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

export default withRouter(connect(mapStateToProps, actions)(NavBar))

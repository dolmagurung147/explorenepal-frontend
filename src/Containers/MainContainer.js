import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../Components/NavBar'
import MyAppointments from './MyAppointments'
import MyProfile from './MyProfile'
import PlacesIVisited from './PlacesIVisited'
import * as actions from '../actions'

import { connect } from 'react-redux'

class MainContainer extends Component {

  // state = {
  //   loggedIn: false
  // }

  componentDidMount(){
    if (localStorage.getItem('token')){
      let token = localStorage.getItem('token')
      let userType = localStorage.getItem('userType')
      // this.setState({
      //   loggedIn: true
      // })
      this.props.auto_login(token, userType)
    }
  }

  // logout = () => {
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('userType')
  //   this.setState({
  //     loggedIn: false
  //   })
  //   return <Login />
  // }

  render(){
    return (
      <div>
        <NavBar />
        <Switch>
          <Route  path ="/home" render={()=> <Home / >}/>
          <Route  path="/login" render={()=> <Login />}/>
          <Route  path="/myAppointments" render={()=> <MyAppointments />}/>
          <Route  path="/myProfile" render={()=> <MyProfile />}/>
          <Route  path="/placesIVisited" render={()=> <PlacesIVisited />}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps, actions)(MainContainer)

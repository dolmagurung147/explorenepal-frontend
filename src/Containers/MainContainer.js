import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import MainPage from '../Components/MainPage'
import Login from './Login'
import Home from './Home'
import MyAppointments from './MyAppointments'
import MyProfile from './MyProfile'
import PlacesIVisited from './PlacesIVisited'
import TouristsGuided from './TouristsGuided'
import MyRequests from './MyRequests'
import * as actions from '../actions'

import { connect } from 'react-redux'
// import { LastLocationProvider } from 'react-router-last-location';


class MainContainer extends Component {


  componentDidMount(){
    if (localStorage.getItem('token')){
      let token = localStorage.getItem('token')
      let userType = localStorage.getItem('userType')
      this.props.auto_login(token, userType)
    }
  }


  render(){
    return (
          <Switch>
            <Route  path ="/home" render={()=> <Home / >}/>
            <Route  path="/login" render={()=> <Login />}/>
            <Route  path="/myAppointments" render={()=> <MyAppointments />}/>
            <Route  path="/myProfile" render={()=> <MyProfile />}/>
            <Route  path="/placesIVisited" render={()=> <PlacesIVisited />}/>
            <Route  path="/touristsGuided" render={()=> <TouristsGuided />}/>
            <Route  path="/myRequests" render={()=> <MyRequests />}/>
            <Route  path="/" render={()=> <MainPage />}/>
          </Switch>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarClicked: state.sidebarClicked,
    state: state
  }
}

export default connect(mapStateToProps, actions)(MainContainer)

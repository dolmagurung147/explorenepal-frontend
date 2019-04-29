import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../Components/NavBar'
import * as actions from '../actions'

import { connect } from 'react-redux'

class MainContainer extends Component {

  componentDidMount(){
    // if (localStorage.getItem('token'))
    // let token = localStorage.getItem('token').split(',')[0]
    // let userType = localStorage.getItem('token').split(',')[1]
    // this.props.login(token, userType)
  }

  render(){
    console.log(this.props.whoIsLoggedIn);
    return (
      <div>
      <NavBar />
      <Switch>
      <Route exact path ="/home" render={()=> <Home / >}/>
      <Route exact path="/login" render={()=> <Login />}/>
      </Switch>
      </div>
    )
  }
}

export default connect(null, actions)(MainContainer)

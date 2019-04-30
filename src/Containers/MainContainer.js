import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../Components/NavBar'
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
      <Route exact path ="/home" render={()=> <Home / >}/>
      <Route exact path="/login" render={()=> <Login />}/>
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

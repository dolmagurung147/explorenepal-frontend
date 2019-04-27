import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../Components/NavBar'
import * as actions from '../actions'

import { connect } from 'react-redux'

class MainContainer extends Component {

  // componentDidMount(){
  //   let token = localStorage.getItem('token')
  //   this.props.login(token, this.props.whoIsLoggedIn)
  //   // console.log(this.props.state);
  //   console.log(this.props.whoIsLoggedIn);
  // }

  render(){
    console.log(this.props.whoIsLoggedIn);
    let token = localStorage.getItem('token')
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

const mapStateToProps = (state) =>{
  return {
    whoIsLoggedIn: state.whoIsLoggedIn
  }
}
export default connect(mapStateToProps, actions)(MainContainer)

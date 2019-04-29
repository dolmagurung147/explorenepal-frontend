import React from 'react'
import TouristSignup from '../Components/TouristSignup'
import TourGuideSignup from '../Components/TourGuideSignup'

import { connect } from 'react-redux'
import * as actions from '../actions'

class Login extends React.Component {
  state = {
    newUser: false,
    touristLogin: true,
    touristSignup: false,
    username: '',
    password: ''
  }

  changeLoginPageHandler = (e) => {
    e.preventDefault();
    this.setState({
      touristLogin: false
    })
  }

  touristSignupPageHandler = (e) => {
    e.preventDefault();
    this.setState({
      newUser: true,
      touristSignup: true
    })
  }

  tourguideSignupPageHandler = (e) => {
    e.preventDefault();
    this.setState({
      newUser: true,
      touristSignup: false
    })
  }


  touristLoginFormHandler = (e) => {
    e.preventDefault();
    let type = this.state.touristLogin ? "tourist" : "tour_guide"
    this.props.matchUserforLogin(this.state.username, this.state.password, type)
  }

  tourguideLoginFormHandler = (e) => {
    e.preventDefault();
    console.log("tour guide login form handler")
  }

  usernameOnchangeHandler = (e) =>{
    this.setState({
      username: e.target.value
    })
  }

  passwordOnchangeHandler = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  touristLoginForm = () => {
    return (
      <div>
        <h1> Tourist Login Form </h1>
        <form onSubmit={this.touristLoginFormHandler}>
          Username: <input type="text" name="username" onChange={this.usernameOnchangeHandler}/>
          Password: <input type="password" name="password" onChange={this.passwordOnchangeHandler}/>
          <button> Submit </button>
        </form>

        <button onClick={this.touristSignupPageHandler}> New Tourist? </button>
        <button onClick={this.changeLoginPageHandler}> Not Tourist But a Tourguide? </button>
      </div>
    )
  }

  tourguideLoginForm = () => {
    return (
      <div>
        <h1> Tour Guide Login Form </h1>
        <form onSubmit={this.tourguideLoginFormHandler}>
          Username: <input type="text" name="username" onChange={this.usernameOnchangeHandler}/>
          Password: <input type="password" name="password" onChange={this.passwordOnchangeHandler}/>
          <button> Submit </button>
        </form>

        <button onClick={this.tourguideSignupPageHandler}> New Tourguide? </button>
      </div>
    )
  }



  loginFormHandler = () => {
    return this.state.touristLogin? this.touristLoginForm() : this.tourguideLoginForm()
  }

  signupFormHandler = () => {
    return this.state.touristSignup? <TouristSignup /> : <TourGuideSignup />
  }

  render(){
    return this.state.newUser? this.signupFormHandler() : this.loginFormHandler()
  }
}

export default connect(null, actions )(Login)

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form, Card } from 'semantic-ui-react'

import TouristSignup from '../Components/TouristSignup'
import TourGuideSignup from '../Components/TourGuideSignup'

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
    this.props.history.push('/home')
  }

  tourguideLoginFormHandler = (e) => {
    e.preventDefault();
    let type = this.state.touristLogin ? "tourist" : "tour_guide"
    this.props.matchUserforLogin(this.state.username, this.state.password, type)
    this.props.history.push('/home')
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
      <div >
        <h1> Tourist Login Form </h1>
        <Card className='loginForm'>
          <Card.Content>
            <Form className='loginFormWidth'>
              <Form.Input label='Username' icon='user' iconPosition='left' type="text" name="username" onChange={this.usernameOnchangeHandler}/>
              <Form.Input label='Password' icon='lock' iconPosition='left' type="password" name="password" onChange={this.passwordOnchangeHandler}/>
              <br/>
              <Button basic color='blue' onClick={this.touristLoginFormHandler}> Login </Button>
            </Form>
            </Card.Content>
            <Card.Content extra>
            <div className='ui two buttons'>
            <Button basic color='blue' onClick={this.touristSignupPageHandler}> New Tourist? </Button>
            <Button basic color='blue' onClick={this.changeLoginPageHandler}> Not Tourist But a Tourguide? </Button>
            </div>
          </Card.Content>
        </Card>
    </div>
    )
  }

  tourguideLoginForm = () => {
    return (
      <div>
        <h1> Tour Guide Login Form </h1>
        <Card className='loginForm'>
          <Card.Content>
            <Form >
              <Form.Input label='Username' icon='user' iconPosition='left' type="text" name="username" onChange={this.usernameOnchangeHandler}/>
              <Form.Input label='Password' icon='lock' iconPosition='left' type="password" name="password" onChange={this.passwordOnchangeHandler}/>
              <br/>
              <Button basic color='blue' onClick={this.tourguideLoginFormHandler}> Login </Button>
            </Form>
            </Card.Content>
            <Card.Content extra>
            <Button basic color='blue' onClick={this.tourguideSignupPageHandler}> New Tour Guide? </Button>
          </Card.Content>
        </Card>
      </div>
    )
  }



  loginFormHandler = () => {
    return this.state.touristLogin? this.touristLoginForm() : this.tourguideLoginForm()
  }

  cancelSignupHandler = (e) => {
    e.preventDefault();
    this.setState({
      newUser: false
    })
  }

  signupFormHandler = () => {
    return this.state.touristSignup? <TouristSignup cancelSignupHandler={this.cancelSignupHandler}/> : <TourGuideSignup cancelSignupHandler={this.cancelSignupHandler}/>
  }

  render(){
    return (
      <div className='manageTopMargin mainContainer ' style={{height: '93vh'}}>
        {this.state.newUser? this.signupFormHandler() : this.loginFormHandler()}
      </div>
    )
  }
}

export default withRouter(connect(null, actions )(Login))

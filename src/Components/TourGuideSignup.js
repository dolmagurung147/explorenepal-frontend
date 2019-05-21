import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { withRouter } from 'react-router-dom'

import { Form, Button, Card } from 'semantic-ui-react'

class TourGuideSignup extends React.Component {

  state = {
    name: '',
    profile_picture: '',
    username: '',
    password: '',
    short_bio: '',
    picture_id: '',
    date_of_birth: null
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.newUserSignUp(this.state, "tour_guide");
    this.props.history.push('/home')
  }


  render() {
    return (
      <div>
        <h1> TOUR GUIDE SIGNUP PAGE </h1>
        <Card className='signUpForm'>
          <Card.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Name' type="text" value={this.state.name} name='name' onChange={this.onChangeHandler} placeholder='Name'/>
            <Form.Input fluid label='Username' type="text" value={this.state.username} name='username' onChange={this.onChangeHandler} placeholder='Username'/>
            <Form.Input fluid label='Password' type="password" value={this.state.password} name='password' onChange={this.onChangeHandler} placeholder='Password'/>
          </Form.Group>
          <Form.TextArea label='Short Bio' type="text" value={this.state.short_bio} name='short_bio' onChange={this.onChangeHandler} placeholder='About you....'/>
            <Form.Input label='Profile Picture' type="text" value={this.state.profile_picture} name='profile_picture' onChange={this.onChangeHandler} placeholder='Profile Picture'/>
            <Form.Input label='Date of Birth:' type="date" value={this.state.date_of_birth} name='date_of_birth' onChange={this.onChangeHandler} placeholder='DOB'/>
          <Button basic color='blue' onClick={this.onSubmitHandler}> Signup </Button>
          <Button basic color='red' onClick={this.props.cancelSignupHandler}> Cancel </Button>
        </Form>
        </Card.Content>
      </Card>
      </div>
    )
  }
}

export default withRouter(connect(null, actions )(TourGuideSignup))

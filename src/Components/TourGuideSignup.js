import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

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

  // Name: <input type="text" name="name" onChange={this.onChangeHandler} />
  // Username: <input type="text" name="username" onChange={this.onChangeHandler} />
  // Profile Picture: <input type="text" name="profile_picture" onChange={this.onChangeHandler} />
  // Password: <input type="password" name="password" onChange={this.onChangeHandler} />
  // Short-Bio: <input type="text" name="short_bio" onChange={this.onChangeHandler} />
  // Picture-Id: <input type="text" name="picture_id" onChange={this.onChangeHandler} />
  // DOB: <input type="date" name="date_of_birth" onChange={this.onChangeHandler} />
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
        </Form>
        </Card.Content>
      </Card>
      </div>
    )
  }
}

export default connect(null, actions )(TourGuideSignup)

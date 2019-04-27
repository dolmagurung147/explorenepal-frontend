import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class TouristSignup extends React.Component {

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
    this.props.newUserSignUp(this.state, "tourist");
  }

  render() {
    return (
      <div>
      <h1> TOURIST SIGNUP PAGE </h1>
      <form onSubmit={this.onSubmitHandler}>
      Name: <input type="text" name="name" onChange={this.onChangeHandler} />
      Profile Picture: <input type="text" name="profile_picture" onChange={this.onChangeHandler} />
      Username: <input type="text" name="username" onChange={this.onChangeHandler} />
      Password: <input type="password" name="password" onChange={this.onChangeHandler} />
      Short-Bio: <input type="text" name="short_bio" onChange={this.onChangeHandler} />
      Picture-Id: <input type="text" name="picture_id" onChange={this.onChangeHandler} />
      DOB: <input type="date" name="date_of_birth" onChange={this.onChangeHandler} />
      <button> Signup </button>
      </form>
      </div>
    )
  }
}

export default connect(null, actions )(TouristSignup)

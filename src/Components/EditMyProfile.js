import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form } from 'semantic-ui-react'

class EditMyProfile extends Component {

  state = {
    name: this.props.userInfo.name,
    profile_picture: this.props.userInfo.profile_picture,
    username: this.props.userInfo.username,
    short_bio: this.props.userInfo.short_bio,
    date_of_birth: this.props.userInfo.date_of_birth,
  }

  userInfoChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  saveEditButtonClickHandler = (e) =>{
    e.preventDefault();
    this.props.saveChanges(this.state)
  }

  render() {
    console.log(this.props);
    return (
      <div className='manageTopMargin manageHeight'>
        <h1>Edit My Profile </h1>
        <div className='editProfileInfo'>
          <div className='editProfileForm'>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Name' type="text" value={this.state.name} name='name' onChange={this.userInfoChangeHandler}/>
                <Form.Input fluid label='Username' type="text" value={this.state.username} name='username' onChange={this.userInfoChangeHandler}/>
              </Form.Group>
              <Form.TextArea label='Short Bio' type="text" value={this.state.short_bio} name='short_bio' onChange={this.userInfoChangeHandler} />
                <Form.Input label='Profile Picture' type="text" value={this.state.profile_picture} name='profile_picture' onChange={this.userInfoChangeHandler}/>
                <Form.Input label='Date of Birth:' type="date" value={this.state.date_of_birth} name='date_of_birth' onChange={this.userInfoChangeHandler}/>
              <Button primary onClick={this.saveEditButtonClickHandler}>Save</Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loggedInuserInfo
  }
}

export default connect(mapStateToProps)(EditMyProfile)

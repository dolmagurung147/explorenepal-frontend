import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      <>
        <h1>Edit My Profile </h1>
        Name: <input type="text" value={this.state.name} name='name' onChange={this.userInfoChangeHandler}/>
        Profile Picture: <input type="text" value={this.state.profile_picture} name='profile_picture' onChange={this.userInfoChangeHandler}/>
        Username: <input type="text" value={this.state.username} name='username' onChange={this.userInfoChangeHandler}/>
        Short Bio: <input type="text" value={this.state.short_bio} name='short_bio' onChange={this.userInfoChangeHandler}/>
        Date of Birth: <input type="date" value={this.state.date_of_birth} name='date_of_birth' onChange={this.userInfoChangeHandler}/>
        <button onClick={this.saveEditButtonClickHandler}>Save</button>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loggedInuserInfo
  }
}

export default connect(mapStateToProps)(EditMyProfile)

import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyProfile extends Component {

  state = {
    editButtonClicked: false,
    name: this.props.userInfo.name,
    profile_picture: this.props.userInfo.profile_picture,
    username: this.props.userInfo.username,
    short_bio: this.props.userInfo.short_bio
  }

  editMyProfileHandler = (e) => {
    e.preventDefault();
    console.log("hey there Hakuna Matata");
    this.setState({
      editButtonClicked: true
    })
  }

  editMyProfile = () => {
    return (
      <div>
        <h1>Edit My Profile </h1>
        Name: <input type="text" value={this.state.name}/>
      </div>
    )
  }

  showMyProfile = () => {
    return(
      <div>
        <h1>MY Profile </h1>
        <h1>{this.props.userInfo.name} </h1>
        <img src={this.props.userInfo.profile_picture} />
        <p>Username : {this.props.userInfo.username}</p>
        <p>Short-Bio: {this.props.userInfo.short_bio}</p>
        <button onClick={this.editMyProfileHandler}> EDIT MY PROFILE </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.editButtonClicked ? this.editMyProfile() : this.showMyProfile()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    whoIsLoggedIn: state.whoIsLoggedIn,
    userInfo: state.loggedInuserInfo
  }
}

export default connect(mapStateToProps)(MyProfile)

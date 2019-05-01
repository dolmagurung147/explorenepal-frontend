import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class MyProfile extends Component {

  state = {
    editButtonClicked: false,
    name: '',
    profile_picture: '',
    username: '',
    short_bio: '',
    haveUserInfo: false
  }


  editMyProfileHandler = (e) => {
    e.preventDefault();
    this.setState({
      editButtonClicked: true
    })
  }

  userInfoChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  saveEditButtonClickHandler = (e) => {
    e.preventDefault();
    let updateData = {name: this.state.name,
      profile_picture: this.state.profile_picture,
      short_bio: this.state.short_bio,
      username: this.state.username,
      editButtonClicked: false
    }
    this.props.updateUserInfo(updateData, this.props.whoIsLoggedIn, this.props.userInfo.id)
    this.setState({
      editButtonClicked:false
    })
  }

  editMyProfile = () => {
    if (!this.state.haveUserInfo) {
      this.setState({
        haveUserInfo: true,
        name: this.props.userInfo.name,
        profile_picture: this.props.userInfo.profile_picture,
        username: this.props.userInfo.username,
        short_bio: this.props.userInfo.short_bio,
      })
    }

    return (
      <div>
        <h1>Edit My Profile </h1>
        Name: <input type="text" value={this.state.name} name='name' onChange={this.userInfoChangeHandler}/>
        Profile Picture: <input type="text" value={this.state.profile_picture} name='profile_picture' onChange={this.userInfoChangeHandler}/>
        Username: <input type="text" value={this.state.username} name='username' onChange={this.userInfoChangeHandler}/>
        Short Bio: <input type="text" value={this.state.short_bio} name='short_bio' onChange={this.userInfoChangeHandler}/>
        <button onClick={this.saveEditButtonClickHandler}>Save</button>
      </div>
    )
  }

  showMyProfile = () => {
    console.log(this.props);
    return(
      <div>
        <h1>MY Profile </h1>
        <h1>{this.props.userInfo.name} </h1>
        <img src={this.props.userInfo.profile_picture} alt=''/>
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

export default connect(mapStateToProps, actions)(MyProfile)

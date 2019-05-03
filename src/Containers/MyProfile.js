import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import EditMyProfile from '../Components/EditMyProfile'

class MyProfile extends Component {

  state = {
    editButtonClicked: false
  }

  editMyProfileHandler = (e) => {
    e.preventDefault();
    this.setState({
      editButtonClicked: true
    })
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
        <p>Date of Birth: {this.props.userInfo.date_of_birth}</p>
        <button onClick={this.editMyProfileHandler}> EDIT MY PROFILE </button>
      </div>
    )
  }

  saveEditProfileHandler = (changedInfo) => {
    this.setState({
      editButtonClicked: false
    })
    this.props.updateUserInfo(changedInfo, this.props.whoIsLoggedIn, this.props.userInfo.id)
  }

  render() {
    return (
      <div>
        {this.state.editButtonClicked ? <EditMyProfile saveChanges={this.saveEditProfileHandler}/> : this.showMyProfile()}
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

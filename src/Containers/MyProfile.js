import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import EditMyProfile from '../Components/EditMyProfile'
import ShowMyProfile from '../Components/ShowMyProfile'

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

  saveEditProfileHandler = (changedInfo) => {
    this.setState({
      editButtonClicked: false
    })
    this.props.updateUserInfo(changedInfo,
      this.props.whoIsLoggedIn,
      this.props.userInfo.id)
  }

  render() {
    return (
      <div>
        {this.state.editButtonClicked ?
          <EditMyProfile
          saveChanges={this.saveEditProfileHandler}
          /> :
          <ShowMyProfile
          userInfo={this.props.userInfo}
          editMyProfileHandler={this.editMyProfileHandler}
          />}
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

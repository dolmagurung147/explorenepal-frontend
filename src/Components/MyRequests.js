import React from 'react'
import { connect } from 'react-redux'

const MyRequests = (props) => {
  console.log(props.state.whoIsLoggedIn);
  return (
    <div>
      MY REQUESTS
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(MyRequests);

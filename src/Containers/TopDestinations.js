import React from 'react'
import { connect } from 'react-redux'

const TopDestinations = (props) => {
  // console.log(props);
  // let topDestinations = props.destinations.filter(destination => {
  //   return destination
  // })
  return (
    <h1>Top Destinations</h1>
  )
}

const mapStateToProps = (state) => {
  return {
    destinations: state.destinations
  }
}

export default connect(mapStateToProps)(TopDestinations)

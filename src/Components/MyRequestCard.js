import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class MyRequestCard extends Component {

  componentDidMount() {
    if (!this.props.allTourists.length) {
      this.props.fetchAllTourists()
    }
  }

  destinationName = () => {
    if (this.props.destinations.length) {
      return (
        this.props.destinations.find(destination => destination.id === this.props.request.destination_id)
      ).name
    }
  }

  cancelRequestHandler = () => {
    this.props.deleteRequest(this.props.request.id)
  }

  showTouristOptions = () => {
    return (
      <>
        <button onClick={this.cancelRequestHandler}>Cancel this request</button>
      </>
    )
  }

  acceptRequestHandler = () => {
    let appointmentData = {
      tourist_id: this.props.request.tourist_id,
      tour_guide_id: this.props.request.tour_guide_id,
      destination_id: this.props.request.destination_id,
      date_and_time: this.props.request.date_and_time
    }
    this.props.createNewAppointment(appointmentData)
    this.props.deleteRequest(this.props.request.id)
  }

  declineRequestHandler = () => {
    this.props.deleteRequest(this.props.request.id)
    console.log("DECLINE THE REQUEST");
  }

  aboutTourist = () => {
    if (this.props.allTourists.length) {
      let foundTourist = this.props.allTourists.find(tourist => {
        return tourist.id === this.props.request.tourist_id
      })
      return (
        <div>
        Name: {foundTourist.name} <br />
        Rating: {foundTourist.avgrating} <br />
        </div>
      )
    }
  }

  showTourGuideOptions = () => {
    return (
      <>
        Tourist: {this.aboutTourist()} <br />
        <button onClick={this.acceptRequestHandler}> Accept </button>
        <button onClick={this.declineRequestHandler}> Decline </button>
      </>
    )
  }

  render() {
    return (
      <div>
      Destination : {this.destinationName()} <br/>
      Date : {this.props.request.date_and_time.split('T')[0]}<br/>
      Time : {this.props.request.date_and_time.split('T')[1]}<br/>
      {this.props.whoIsLoggedIn === 'tourist' ? this.showTouristOptions() : this.showTourGuideOptions()} <br/> <br/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    whoIsLoggedIn: state.whoIsLoggedIn,
    destinations: state.destinations,
    allTourists: state.allTourists,
    allTourGuides: state.allTourGuides,
  }
}


export default connect(mapStateToProps, actions)(MyRequestCard);

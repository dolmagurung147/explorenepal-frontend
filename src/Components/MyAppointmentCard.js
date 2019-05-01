import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class MyAppointmentCard extends Component{

  state = {
    allTourGuides: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/tour_guides')
    .then(res => res.json())
    .then(tour_guides => this.setState({
        allTourGuides: tour_guides
      })
    )
  }

  findDestination = () => {
    if (this.props.destinations.length > 0) {
      return(
        this.props.destinations.find(destination => {
          return destination.id == this.props.myAppointment.destination_id
        })
      )
    }
  }

  findTourGuide = () => {
    if (this.state.allTourGuides.length > 0) {
      return(
        this.state.allTourGuides.find(tourGuide => {
          return tourGuide.id == this.props.myAppointment.tour_guide_id
        })
      )
    }
  }

  deleteAppointmentHandler = (e) => {
    e.preventDefault()
    this.props.deleteAppointment(this.props.myAppointment.id)
  }

  individualAppointmentInfo = (destinationInfo, tourGuideInfo) => {
    return (
      <div>
        <h1>{destinationInfo.name}</h1> <br/>
        <img src={destinationInfo.destination_images[0].image} />  <br/>
        Date: {this.props.myAppointment.date_and_time.split('T')[0]} <br/>
        Time: {this.props.myAppointment.date_and_time.split('T')[1]} <br/>
        Assigned Tour Guide: {tourGuideInfo.name} <br/>
        <button onClick={this.deleteAppointmentHandler}>Delete This Appointment </button> <br/>
        <button>Edit This Appointment </button> <br/> <br/>
      </div>
    )
  }

  render(){
    return (
      <div>
      {this.findDestination() && this.findTourGuide() ? this.individualAppointmentInfo(this.findDestination(), this.findTourGuide() ) : null}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    destinations: state.destinations,
    state: state
  }
}

export default connect(mapStateToProps, actions)(MyAppointmentCard)

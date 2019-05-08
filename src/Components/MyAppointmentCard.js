import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { Card, Image, Button } from 'semantic-ui-react'

class MyAppointmentCard extends Component{

  state = {
    editButtonClicked: false,
    editedDate: this.props.myAppointment.date_and_time.split('T')[0],
    editedTime: this.props.myAppointment.date_and_time.split('T')[1].split('.')[0]
  }

  componentDidMount() {
    if (!this.props.allTourists.length) {
      this.props.fetchAllTourists();
    }
  }

  findDestination = () => {
    if (this.props.destinations.length > 0) {
      return(
        this.props.destinations.find(destination => {
          return destination.id === this.props.myAppointment.destination_id
        })
      )
    }
  }

  findTourGuide = () => {
    if (this.props.allTourGuides.length > 0) {
      return(
        this.props.allTourGuides.find(tourGuide => {
          return tourGuide.id === this.props.myAppointment.tour_guide_id
        })
      )
    }
  }

  findTourist = () => {
    if (this.props.allTourists.length > 0) {
      return(
        this.props.allTourists.find(tourist => {
          return tourist.id === this.props.myAppointment.tourist_id
        })
      )
    }
  }

  deleteAppointmentHandler = (e) => {
    e.preventDefault()
    this.props.deleteAppointment(this.props.myAppointment.id)
  }

  editAppointmentHandler = (e) => {
    e.preventDefault()
    this.setState({
      editButtonClicked: true
    })
  }

  dateAndTimeChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  saveEditedAppointmentHandler = (e) => {
    e.preventDefault()
    let date_and_time = `${this.state.editedDate} ${this.state.editedTime}`
    this.props.editAppointment(this.props.myAppointment.id, date_and_time)
    this.setState({
      editButtonClicked: false
    })
  }

  individualAppointmentInfo = (destinationInfo, userInfo) => {
    if (this.state.editButtonClicked) {
      return (
        <Card >
          <h1 id='appointmentHeader'>{destinationInfo.name}</h1> <br/>
          <Image className='appointmentImg' src={destinationInfo.destination_images[0].image} wrapped alt='' />  <br/>
          Date: <input type='date' value={this.state.editedDate} name='editedDate' onChange={this.dateAndTimeChangeHandler}/> <br/>
          Time: <input type='time' value={this.state.editedTime} name='editedTime' onChange={this.dateAndTimeChangeHandler}/> <br/>
          {this.props.whoIsLoggedIn === 'tourist' ? <p>Assigned Tour Guide: {userInfo.name}</p> : <p> Appointed Tourist: {userInfo.name} </p>} <br/>
          <button onClick={this.saveEditedAppointmentHandler}>Save Changes </button> <br/> <br/>
        </Card>
      )
    } else {
      return (
        <Card style={{marginBottom: '40px'}}>
          <h1 id='appointmentHeader'>{destinationInfo.name}</h1> <br/>
          <img className='appointmentImg' src={destinationInfo.destination_images[0].image} alt=''/>  <br/>
          Date: {this.props.myAppointment.date_and_time.split('T')[0]} <br/>
          Time: {this.props.myAppointment.date_and_time.split('T')[1]} <br/>
          {this.props.whoIsLoggedIn === 'tourist' ? <p>Assigned Tour Guide: {userInfo.name}</p> : <p> Appointed Tourist: {userInfo.name}</p>} <br/>
          <div className='ui two buttons'>
          <Button basic color='blue' onClick={this.editAppointmentHandler}>Edit This Appointment </Button> <br/> <br/>
          <Button basic color='red' onClick={this.deleteAppointmentHandler}>Delete This Appointment </Button> <br/>
          </div>
        </Card>
      )
    }
  }

  render(){
    if (this.props.whoIsLoggedIn === 'tourist') {
      return (
        <div>
          {this.findDestination() && this.findTourGuide() ? this.individualAppointmentInfo(this.findDestination(), this.findTourGuide() ) : null}
        </div>
      )
    } else if (this.props.whoIsLoggedIn === 'tour_guide') {
      return (
        <div>
          {this.findDestination() && this.findTourist() ? this.individualAppointmentInfo(this.findDestination(), this.findTourist()) : null}
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    destinations: state.destinations,
    whoIsLoggedIn: state.whoIsLoggedIn,
    allTourGuides: state.allTourGuides,
    allTourists: state.allTourists,
  }
}

export default connect(mapStateToProps, actions)(MyAppointmentCard)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

class ViewAppointmentForm extends Component {
  state = {
    allTourGuides: [],
    selectedTourGuide: '',
    selectedDate: '',
    selectedTime: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/tour_guides')
    .then(res => res.json())
    .then(tour_guides => this.setState({
        allTourGuides: tour_guides
      })
    )
  }

  tour_guides_list = () =>{
    return this.state.allTourGuides.map((tour_guide) => {
      return <option value={tour_guide.name} key={tour_guide.id}>{tour_guide.name}</option>
    })
  }

  selectTourGuideHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      selectedTourGuide: e.target.value
    })
  }

  selectDateHandler = (e) => {
    this.setState({
      selectedDate: e.target.value
    })
  }

  selectTimeHandler = (e) => {
    this.setState({
      selectedTime: e.target.value
    })
  }


// ----------- Book a destination and a tourguide ----------- //
  makeReservationHandler = (e) => {
    e.preventDefault();
    let tour_guide_id = this.state.allTourGuides.find((tour_guide) => {
      return tour_guide.name === this.state.selectedTourGuide
    }).id
    let date_and_time = `${this.state.selectedDate} ${this.state.selectedTime}`
    fetch('http://localhost:3000/appointments', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        appointment: {
          tourist_id: this.props.tourist_id,
          tour_guide_id: tour_guide_id,
          date_and_time: date_and_time  ,
          destination_id: this.props.destination_id
        }
      })
    })
    .then (res => res.json())
    .then (newAppointment => this.props.addNewAppointment(newAppointment))
    this.setState({
      selectedTourGuide: '',
      selectedDate: '',
      selectedTime: ''
    })
  }

  render(){
    return (
      <form onSubmit={this.makeReservationHandler}>
      <h1> Appointment Form</h1>
      <h2> Choose Date <input type="date" name="appointment_date" onChange={this.selectDateHandler} value={this.state.selectedDate}/></h2>
      <h2> Choose Time <input type="time" name="appointment_date" onChange={this.selectTimeHandler} value={this.state.selectedTime}/></h2>
      <h2> Choose Tour Guide: </h2>
      <select value={this.state.selectedTourGuide} onChange={this.selectTourGuideHandler}>
        <option value='' >Please Select</option>
        {this.tour_guides_list()}
      </select>
      <button> Make a Reservation</button>
      </form>
    )
  }
}

export default connect(null, actions)(ViewAppointmentForm)

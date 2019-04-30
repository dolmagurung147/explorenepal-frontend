import React, { Component } from 'react';

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
    console.log("make reservation", this.state);
  }

  render(){
    return (
      <form onSubmit={this.makeReservationHandler}>
      <h1> Appointment Form</h1>
      <h2> Choose Date: <input type="date" name="appointment_date" onChange={this.selectDateHandler} value={this.state.selectedDate}/></h2>
      <h2> Choose Time: <input type="time" name="appointment_date" onChange={this.selectTimeHandler} value={this.state.selectedTime}/></h2>
      <h2> Choose Tour Guide: </h2>
      <select value="this.state.selectedTourGuide" onChange={this.selectTourGuideHandler}>
        <option value='' >Please Select</option>
        {this.tour_guides_list()}
      </select>
      <button> Make a Reservation</button>
      </form>
    )
  }
}

export default ViewAppointmentForm

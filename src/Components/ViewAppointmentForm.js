import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

import RatingConversion from './RatingConversion'

import { Button, Card, Image } from 'semantic-ui-react'

class ViewAppointmentForm extends Component {
  state = {
    selectedTourGuide: '',
    selectedDate: '',
    selectedTime: '',
    showTourGuideInfo: false,
    defaultImage: 'https://www.puriindahmall.co.id/assets/img/default.png'
  }

  componentDidMount() {
      if (!this.props.allTourGuides.length) {
        this.props.fetchAllTourGuides();
      }
  }


  tour_guides_list = () =>{
    return this.props.allTourGuides.map((tour_guide) => {
      return <option value={tour_guide.name} key={tour_guide.id} >{tour_guide.name} </option>
    })
  }


  selectTourGuideHandler = (e) => {
    // this.setState({
    //   selectedTourGuide: e.target.value
    // })
    this.setState({
      selectedTourGuide: e.target.value,
      showTourGuideInfo: true
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
    if (Date.parse(this.state.selectedDate) < Date.now()){
      alert('Please Enter valid date')
    } else {
      let tour_guide_id = this.props.allTourGuides.find((tour_guide) => {
        return tour_guide.name === this.state.selectedTourGuide
      }).id
      let date_and_time = `${this.state.selectedDate} ${this.state.selectedTime}`
      let data = {
        tourist_id: this.props.tourist_id,
        tour_guide_id: tour_guide_id,
        destination_id: this.props.destination_id,
        date_and_time: date_and_time
      }
      this.props.makeNewRequestForReservation(data)
      this.props.toggleBackState();
      this.setState({
        selectedTourGuide: '',
        selectedDate: '',
        selectedTime: ''
      })
    }
  }

  tourguidechosenHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      showTourGuideInfo: false
    })
  }

  tourguiderejectHandler = (e) => {
    e.preventDefault();
    console.log("REJECTED");
    this.setState({
      selectedTourGuide: '',
      showTourGuideInfo: false
    })
  }

  showTourGuideInfo = () => {
    console.log(this.state.selectedTourGuide);
    let selectedTourGuide = this.props.allTourGuides.find(tour_guideObj => tour_guideObj.name === this.state.selectedTourGuide)
    console.log(selectedTourGuide);
    return (
      <Card style={{marginLeft: '42%'}}>
        <Image src={selectedTourGuide.profile_picture ? selectedTourGuide.profile_picture : this.state.defaultImage} />
        <h1>{selectedTourGuide.name}</h1>
        <h3>Rating: </h3> <RatingConversion rating={selectedTourGuide.avgrating} />
        <div className='ui two buttons' >
          <Button basic color='blue' onClick={this.tourguidechosenHandler}> Choose </Button>
          <Button basic color='red' onClick={this.tourguiderejectHandler}> Pass </Button>
        </div>
      </Card>
    )
  }

  render(){
    return (
      <form >
      <h1> Appointment Form</h1>
      <h2> Choose Date <input className='inputForm' type="date" name="appointment_date" onChange={this.selectDateHandler} value={this.state.selectedDate}/></h2>
      <h2> Choose Time <input className='inputForm' type="time" name="appointment_date" onChange={this.selectTimeHandler} value={this.state.selectedTime}/></h2>
      <h2> Choose Tour Guide: </h2>
      <select value={this.state.selectedTourGuide} onChange={this.selectTourGuideHandler}>
        <option value=''>Please Select</option>
        {this.tour_guides_list()}
      </select>
      {this.state.showTourGuideInfo ? this.showTourGuideInfo() : null}
      <Button primary onClick={this.makeReservationHandler}> Request a Reservation</Button>
      <Button color='red' onClick={this.props.toggleBackState}> Cancel </Button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allTourGuides: state.allTourGuides
  }
}

export default connect(mapStateToProps, actions)(ViewAppointmentForm)

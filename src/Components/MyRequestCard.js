import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import RatingConversion from './RatingConversion'

import { Icon, Button, Card, Image } from 'semantic-ui-react'

class MyRequestCard extends Component {

  state = {
    tourist: {}
  }

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

  aboutTourGuide = () => {
    if (this.props.allTourGuides.length) {
      let foundTourGuide = this.props.allTourGuides.find(tourGuide => {
        return tourGuide.id === this.props.request.tour_guide_id
      })
      return foundTourGuide
    }
  }

  showTouristOptions = () => {
    console.log(this.aboutTourGuide());
    return (
      <div>
        <Card.Header><Icon name='user' /> {this.aboutTourGuide() ? this.aboutTourGuide().name : null} </Card.Header>
        <Card.Meta> Destination: {this.destinationName()}</Card.Meta> <br/>
        <Card.Description>Date : {this.props.request.date_and_time ? this.props.request.date_and_time.split('T')[0] : null}<br/>
        Time : {this.props.request.date_and_time ? this.props.request.date_and_time.split('T')[1] : null}<br/> </Card.Description>
        <Button color='red' onClick={this.cancelRequestHandler}>Cancel this request</Button >
      </div>
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
    this.props.deleteCancelledRequest(this.props.request.id)
    console.log("DECLINE THE REQUEST");
  }

  aboutTourist = () => {
    if (this.props.allTourists.length) {
      let foundTourist = this.props.allTourists.find(tourist => {
        return tourist.id === this.props.request.tourist_id
      })
      return foundTourist
    }
  }

  showTourGuideOptions = () => {
    return (
      <>
        <Image floated='right'
        size='mini'
        src={this.aboutTourist() ? this.aboutTourist().profile_picture : null}
        />
        <Card.Header> <Icon name='user' />{this.aboutTourist() ? this.aboutTourist().name : null} </Card.Header>
        <Card.Header> {this.aboutTourist() ? <RatingConversion rating={this.aboutTourist().avgrating}/> : null} </Card.Header>
        <Card.Meta> Destination: {this.destinationName()}</Card.Meta> <br/>
        <Card.Description>Date : {this.props.request.date_and_time.split('T')[0]}<br/>
        Time : {this.props.request.date_and_time.split('T')[1]}<br/> </Card.Description>
        <div className='ui two buttons'>
          <Button basic color = 'blue' onClick={this.acceptRequestHandler} > Accept </Button>
          <Button basic color = 'red' onClick={this.declineRequestHandler}> Decline </Button>
        </div>
      </>
    )
  }

  render() {
    return (
      <Card>
        <Card.Content>
          {this.props.whoIsLoggedIn === 'tourist' ? this.showTouristOptions() : this.showTourGuideOptions()} <br/> <br/>
        </Card.Content>
      </Card>
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

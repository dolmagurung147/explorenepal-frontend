import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { Button, Card, Image } from 'semantic-ui-react'

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
    this.props.deleteCancelledRequest(this.props.request.id)
    console.log("DECLINE THE REQUEST");
  }

  aboutTourist = () => {
    if (this.props.allTourists.length) {
      let foundTourist = this.props.allTourists.find(tourist => {
        return tourist.id === this.props.request.tourist_id
      })
      return foundTourist
      // (
      //   <div>
      //     <Card.Header> Name: {foundTourist.name} <br/>
      //       Rating: {foundTourist.avgrating}
      //       <Image floated='right' size='mini' src={foundTourist.profile_picture} />
      //     </Card.Header>
      //   </div>
      // )
    }
  }

  showTourGuideOptions = () => {
    return (
      <>
        <Image floated='right'
        size='mini'
        src={this.aboutTourist() ? this.aboutTourist().profile_picture : null}
        />
        <Card.Header> {this.aboutTourist() ? this.aboutTourist().name : null} </Card.Header>
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

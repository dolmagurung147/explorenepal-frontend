import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

const MyRequestCard = (props) => {

  const destinationName = () => {
    if (props.destinations.length) {
      return (
        props.destinations.find(destination => destination.id === props.request.destination_id)
      ).name
    }
  }

  const cancelRequestHandler = () => {
    props.deleteRequest(props.request.id)
  }

  const showTouristOptions = () => {
    return (
      <>
        <button onClick={cancelRequestHandler}>Cancel this request</button>
      </>
    )
  }

  const acceptRequestHandler = () => {
    let appointmentData = {
      tourist_id: props.request.tourist_id,
      tour_guide_id: props.request.tour_guide_id,
      destination_id: props.request.destination_id,
      date_and_time: props.request.date_and_time
    }
    props.createNewAppointment(appointmentData)
    props.deleteRequest(props.request.id)
  }

  const declineRequestHandler = () => {
    props.deleteRequest(props.request.id)
    console.log("DECLINE THE REQUEST");
  }

  const showTourGuideOptions = () => {
    return (
      <>
        <button onClick={acceptRequestHandler}> Accept </button>
        <button onClick={declineRequestHandler}> Decline </button>
      </>
    )
  }

  return (
    <div>
      Destination : {destinationName()} <br/>
      Date : {props.request.date_and_time.split('T')[0]}<br/>
      Time : {props.request.date_and_time.split('T')[1]}<br/>
      {props.whoIsLoggedIn === 'tourist' ? showTouristOptions() : showTourGuideOptions()} <br/> <br/>
    </div>
  )
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

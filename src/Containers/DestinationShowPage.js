import React, { Component } from "react"
import { connect } from 'react-redux'
import ViewAppointmentForm from '../Components/ViewAppointmentForm'

class DestinationShowPage extends Component {
  state = {
    viewAppointmentForm: false
  }

  destinationImages = () => {
    return this.props.chosenDestination.destination_images.map((imageObj) => {
      return <img key={imageObj.id} src={imageObj.image} alt=""/>
      })
  }

  viewAppointmentForm = (e) => {
    e.preventDefault();
    this.setState({
      viewAppointmentForm: true
    })
  }

  booknow = () => {
    if (this.state.viewAppointmentForm) {
      return <ViewAppointmentForm tourist_id={this.props.loggedInuserInfo.id} destination_id={this.props.chosenDestination.id}/>
    }
    else {
      return (
        <button onClick={this.viewAppointmentForm}> Book This Destination </button>
      )
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.chosenDestination.name}
          {this.props.loggedIn && this.props.whoIsLoggedIn === 'tourist' ? this.booknow() : null}
          <img src={this.props.chosenDestination.destination_images[0].image} />
        </div>
        <div>
          {this.destinationImages()}
        </div>
        <div>
          <h2> About: </h2>
          <p> Location: {this.props.chosenDestination.location} </p>
          <p> Difficulty-level: {this.props.chosenDestination.difficulty_level}</p>
          <p> Short Description: {this.props.chosenDestination.about}</p>
          <p> Best Time To Visit: {this.props.chosenDestination.best_time_to_visit}</p>
        </div>
        <div>
          <h2> Reviews and Rating: </h2>
          <p> Average Rating: {this.props.chosenDestination.avgrating}</p>
          { /*WRITE DOWN REVIEWS*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedin,
    whoIsLoggedIn: state.whoIsLoggedIn,
    loggedInuserInfo: state.loggedInuserInfo
  }
}

export default connect(mapStateToProps)(DestinationShowPage)

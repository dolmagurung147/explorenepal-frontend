import React, { Component } from "react"
import { connect } from 'react-redux'

const DestinationShowPage = (props) => {
  console.log(props.chosenDestination);

  const destinationImages = () => {
    return props.chosenDestination.destination_images.map((imageObj) => {
      return <img key={imageObj.id} src={imageObj.image}/>
      })
  }

  return (
    <div>
      <div>
        {props.chosenDestination.name}
        <img src={props.chosenDestination.destination_images[0].image} />
      </div>
      <div>
        {destinationImages()}
      </div>
      <div>
        <h2> About: </h2>
        <p> Location: {props.chosenDestination.location} </p>
        <p> Difficulty-level: {props.chosenDestination.difficulty_level}</p>
        <p> Short Description: {props.chosenDestination.about}</p>
        <p> Best Time To Visit: {props.chosenDestination.best_time_to_visit}</p>
      </div>
      <div>
        <h2> Reviews and Rating: </h2>
        <p> Average Rating: {props.chosenDestination.avgrating}</p>
        ///////write the reviews
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedin,
    whoIsLoggedIn: state.whoIsLoggedIn,
    loggedInuserInfo: state.loggedInuserInfo
  }
}

export default connect(mapStateToProps)(DestinationShowPage)

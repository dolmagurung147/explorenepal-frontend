import React, { Component } from 'react'

class PlaceIVistedCard extends Component{

  state = {
    reviewDestination: false,
    reviewTourGuide: false
  }

  rateDestinationHandler = (e) => {
    e.preventDefault();
    console.log("rating destination...");
  }

  rateTourGuideHandler = (e) => {
    e.preventDefault();
    console.log("rating tour guide...");
  }

  showDestinationAndTourGuidePage = () => {
    return (
      <div>
        {this.props.destination ? <><h1>{this.props.destination.name}</h1><br/><img src={this.props.destination.destination_images[0].image} alt=''/></> : null}
        {this.props.tourGuide ? <h2> Tour Guide: {this.props.tourGuide.name} </h2> : null}
        <button onClick={this.rateDestinationHandler}> Rate this destination </button>
        <button onClick={this.rateTourGuideHandler}> Rate this Tour Guide </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.reviewTourGuide && this.state.reviewDestination ? null : this.showDestinationAndTourGuidePage()}
      </div>
    )
  }
}

export default PlaceIVistedCard

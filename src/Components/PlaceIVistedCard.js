import React, { Component } from 'react'
import { connect } from 'react-redux'

class PlaceIVistedCard extends Component{

  state = {
    reviewDestination: false,
    reviewTourGuide: false,
    rating: 0,
    review: ''
  }

  rateDestinationHandler = (e) => {
    e.preventDefault();
    console.log("rating destination...");
    this.setState({
      reviewDestination: true,
      reviewTourGuide: false
    })
  }

  rateTourGuideHandler = (e) => {
    e.preventDefault();
    console.log("rating tour guide...");
    this.setState({
      reviewDestination: false,
      reviewTourGuide: true
    })
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

  destinationRatingChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      rating: e.target.value
    })
  }

  reviewChangeHandler = (e) => {
    this.setState({
      review: e.target.value
    })
  }

  submitDReviewHandler = (e) => {
    e.preventDefault();
    console.log(this.props.loggedInuserInfo);
    console.log(this.state);
    fetch('http://localhost:3000/destination_reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        destination_review: {
          destination_id: this.props.destination.id,
          tourist_id: this.props.loggedInuserInfo.id,
          rating: this.state.rating,
          review: this.state.review
        }
      })
    })
    .then (res => res.json())
    .then (review => console.log(review))
  }

  eitherReviewDestinationOrTourGuide = () => {
    if (this.state.reviewDestination) {
      return (
        <div>
          {this.props.destination ? <><h1>{this.props.destination.name}</h1><br/><img src={this.props.destination.destination_images[0].image} alt=''/></> : null}
          <h2>RATING: </h2>
          <select value={this.state.value} onChange={this.destinationRatingChangeHandler}>
            <option value="1">1 STAR</option>
            <option value="2">2 STAR</option>
            <option value="3">3 STAR</option>
            <option value="4">4 STAR</option>
            <option value="5">5 STAR</option>
          </select>
          <h2>Review: </h2>
          <input type='text' name='destinationReview' value={this.state.review} onChange={this.reviewChangeHandler}/>
          <button onClick={this.submitDReviewHandler}> SUBMIT </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.state.reviewTourGuide || this.state.reviewDestination ? this.eitherReviewDestinationOrTourGuide() : this.showDestinationAndTourGuidePage()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInuserInfo: state.loggedInuserInfo
  }
}

export default connect(mapStateToProps)(PlaceIVistedCard)

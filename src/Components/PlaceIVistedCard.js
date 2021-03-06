import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import { withRouter } from 'react-router-dom'

import { Button, Divider } from 'semantic-ui-react'

class PlaceIVistedCard extends Component{

  state = {
    reviewDestination: false,
    reviewTourGuide: false,
    rating: 0,
    review: ''
  }


  rateDestinationHandler = (e) => {
    e.preventDefault();
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
        <Button onClick={this.rateDestinationHandler}> Rate this destination </Button>
        <Button onClick={this.rateTourGuideHandler}> Rate this Tour Guide </Button>
      </div>
    )
  }

  // ------------ Destination Rating -------------------
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
    .then (review => this.props.addNewDestinationReview(review))
    this.props.fetchDestinations();
    this.setState({
      reviewDestination: false
    })

  }
  // ------------ End for destination rating ----------

  // ------------ Tour Guide Rating -------------------

  tourGuideRatingChangeHandler = (e) => {
    this.setState({
      rating: e.target.value
    })
  }

// ------------- REVIEW FROM TOURIST TO TOURGUIDE ---------------
  submitTGReviewHandler = (e) => {
    fetch('http://localhost:3000/tourist_reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tourist_review: {
          tour_guide_id: this.props.tourGuide.id,
          tourist_id: this.props.loggedInuserInfo.id,
          rating: this.state.rating,
          tourguide_Review: this.state.review
        }
      })
    })
    .then (res => res.json())
    .then (review => console.log(review))
    this.setState({
      reviewTourGuide: false
    })
  }

  // ------------- END OF Tour Guide Rating----------------

  eitherReviewDestinationOrTourGuide = () => {
    if (this.state.reviewDestination) {
      return (
        <div>
          {this.props.destination ? <><h1>{this.props.destination.name}</h1><br/><img src={this.props.destination.destination_images[0].image} alt=''/></> : null}
          <h2>RATING: </h2>
          <select value={this.state.rating} onChange={this.destinationRatingChangeHandler}>
            <option value="1">1 STAR</option>
            <option value="2">2 STAR</option>
            <option value="3">3 STAR</option>
            <option value="4">4 STAR</option>
            <option value="5">5 STAR</option>
          </select>
          <h2>Review: </h2>
          <input type='text' name='destinationReview' value={this.state.review} onChange={this.reviewChangeHandler}/>
          <Button onClick={this.submitDReviewHandler}> SUBMIT </Button>
        </div>
      )
    } else if (this.state.reviewTourGuide) {
      return (
        <div>
        {this.props.tourGuide ? <><h1>{this.props.tourGuide.name}</h1><br/><img src={this.props.tourGuide.profile_picture} alt=''/></> : null}
        <h2>RATING: </h2>
        <select value={this.state.rating} onChange={this.tourGuideRatingChangeHandler}>
          <option value="1">1 STAR</option>
          <option value="2">2 STAR</option>
          <option value="3">3 STAR</option>
          <option value="4">4 STAR</option>
          <option value="5">5 STAR</option>
        </select>
        <h2>Review: </h2>
        <input type='text' name='tourGuideReview' value={this.state.review} onChange={this.reviewChangeHandler}/>
        <Button onClick={this.submitTGReviewHandler}> SUBMIT </Button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.state.reviewTourGuide || this.state.reviewDestination ? this.eitherReviewDestinationOrTourGuide() : this.showDestinationAndTourGuidePage()}
        <br/><br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInuserInfo: state.loggedInuserInfo,
    allTourGuides: state.allTourGuides
  }
}

export default connect(mapStateToProps, actions)(PlaceIVistedCard)

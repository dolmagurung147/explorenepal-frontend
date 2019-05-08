import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class TouristIGuidedCard extends Component {

  state = {
    rateButtonClicked: false,
    rating: 0,
    review: ''
  }

  rateTouristHandler = (e) => {
    e.preventDefault();
    this.setState({
      rateButtonClicked: true
    })
  }

  touristRatingChangeHandler = (e) => {
    this.setState({
      rating: e.target.value
    })
  }

  touristReviewChangeHandler = (e) => {
    this.setState({
      review: e.target.value
    })
  }

  submitTouristReviewHandler = (e) => {
    e.preventDefault();
    this.setState({
      rateButtonClicked: false
    })
    fetch ('http://localhost:3000/tour_guide_reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tour_guide_review: {
          rating: this.state.rating,
          touristReview: this.state.review,
          tourist_id: this.props.tourist.id,
          tour_guide_id: this.props.tour_guide_id
        }
      })
    })
    .then (res => res.json())
    .then (reviewFORtourist => this.props.addNewTouristReview(reviewFORtourist))
    this.setState({
      rateButtonClicked: false
    })
  }

  viewRatingAndReviewColumns = () => {
    return (
      <>
      <h2>RATING: </h2>
      <select value={this.state.rating} onChange={this.touristRatingChangeHandler}>
        <option value="1">1 STAR</option>
        <option value="2">2 STAR</option>
        <option value="3">3 STAR</option>
        <option value="4">4 STAR</option>
        <option value="5">5 STAR</option>
      </select>
      <h2>Review: </h2>
      <input type='text' name='touristReview' value={this.state.review} onChange={this.touristReviewChangeHandler}/>
      <button onClick={this.submitTouristReviewHandler}> SUBMIT </button>
      </>
    )
  }

  render() {
    return (
      <div>
      <img src={this.props.tourist.profile_picture} alt='' /> <br />
      <h2>Name: {this.props.tourist.name}</h2>
      {this.state.rateButtonClicked ? this.viewRatingAndReviewColumns() : <button onClick={this.rateTouristHandler}> Rate this Tourist </button>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tour_guide_id: state.loggedInuserInfo.id
  }
}

export default connect(mapStateToProps, actions)(TouristIGuidedCard)

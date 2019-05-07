import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaceIVistedCard from '../Components/PlaceIVistedCard'

class PlacesIVisited extends Component {

  // state = {
  //   allTourGuides: []
  // }

  // componentDidMount() {
  //   fetch('http://localhost:3000/tour_guides')
  //   .then(res => res.json())
  //   .then(tour_guides => this.setState({
  //       allTourGuides: tour_guides
  //     })
  //   )
  // }

  findDestination = (destination_id) => {
    if (this.props.destinations.length > 0) {
      return(
        this.props.destinations.find(destination => {
          return destination.id === destination_id
        })
      )
    }
  }

  findTourGuide = (tourGuide_id) => {
      return(
        this.props.allTourGuides.find(tour_guide => {
          return tour_guide.id === tourGuide_id
        })
      )
  }

  individualCardPlace = () => {
    return this.props.placesIVisited.map(places => {
      let destination = this.findDestination(places.destination_id)
      let tourGuide = this.findTourGuide(places.tour_guide_id)
       return <PlaceIVistedCard destination={destination} tourGuide={tourGuide} appointment={places} key={places.id}/>
    })
  }

  noPlaceVisited = () => {
    return (
      <div>
        <h2> No places in Nepal visited yet </h2>
      </div>
    )
  }

  render() {
    return (
      <div className='manageTopMargin'>
      <h1>PLACES I VISITED </h1>
      {this.props.placesIVisited.length > 0 ? this.individualCardPlace() : this.noPlaceVisited()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    placesIVisited: state.placesIVisited,
    destinations: state.destinations,
    allTourGuides: state.allTourGuides,
    state: state
  }
}

export default connect(mapStateToProps)(PlacesIVisited)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import TouristIGuidedCard from '../Components/TouristIGuidedCard'

class TouristsGuided extends Component {

  componentDidMount() {
    if (!this.props.allTourists.length) {
      this.props.fetchAllTourists();
    }
  }

  findTouristsThatIGuided = () => {
    let touristIworkedWith = this.props.allTourists.filter(tourist => {
        return this.props.pastAppointments.filter(pastApp => {
          return pastApp.tourist_id === tourist.id
        }).length
      })
    return touristIworkedWith.map(touristObj => {
      return <TouristIGuidedCard key={touristObj.id} tourist={touristObj} />
    })
  }

  render(){
    return (
      <div>
      <h1> TOURISTS THAT I HAVE WORKED WITH </h1>
      {this.props.allTourists.length > 0 ? this.findTouristsThatIGuided() : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allTourists: state.allTourists,
    pastAppointments: state.placesIVisited,
    state: state
  }
}

export default connect(mapStateToProps, actions)(TouristsGuided)

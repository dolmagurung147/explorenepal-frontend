import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../actions"

import DestinationCard from '../Components/DestinationCard'


class Explore extends Component {

  render() {
    const destinationCards = this.props.destinations.map(destinationObj => {
      return <DestinationCard key={destinationObj.id} destination={destinationObj} destinationChosen={this.props.destinationChosen}/>
    })


    return (
      <div className='explore' style={{textAlign: 'center'}}>
      <h1>Explore</h1>
        <div id='exploreCardContainer'>
          {destinationCards}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    destinations: state.destinations
  }
}

export default connect(mapStateToProps, actions)(Explore)

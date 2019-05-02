import React, { Component } from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withLastLocation } from 'react-router-last-location';

import Explore from './Explore'
import TopDestinations from './TopDestinations'
import DestinationShowPage from './DestinationShowPage'

class Home extends Component {


  allDestinations = () => {
    return (
      <div>
        <Explore destinationChosen={this.destinationChosen} />
        <TopDestinations />
      </div>
    )
  }

  destinationChosen = (destination) => {
    this.props.viewEachDestinationPage(false)
    this.props.setChosenDestination(destination)
  }

  render() {
    console.log(JSON.stringify(this.props.lastLocation));
    return (
      <div>
      {this.props.explorePageToRender ? this.allDestinations() : <DestinationShowPage/>}
      </div>
    )

  }
}

const mapStateToProps = (state) =>{
  return {
    explorePageToRender: state.explorePageToRender,
    chosenDestination: state.chosenDestination
  }
}

export default withLastLocation(connect(mapStateToProps, actions)(Home))

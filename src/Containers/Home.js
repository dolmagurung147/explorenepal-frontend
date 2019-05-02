import React, { Component } from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withLastLocation } from 'react-router-last-location';

import Explore from './Explore'
import TopDestinations from './TopDestinations'
import DestinationShowPage from './DestinationShowPage'

class Home extends Component {

  state = {
    chosenDestination: {}
  }

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
    this.setState({
      chosenDestination: destination
    })
  }

  render() {
    console.log(JSON.stringify(this.props.lastLocation));
    return (
      <div>
      {this.props.explorePageToRender ? this.allDestinations() : <DestinationShowPage chosenDestination={this.state.chosenDestination}/>}
      </div>
    )

  }
}

const mapStateToProps = (state) =>{
  return {
    explorePageToRender: state.explorePageToRender
  }
}

export default withLastLocation(connect(mapStateToProps, actions)(Home))

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
      <div className='mainContainer'>
      <div  style={{margin: '3%'}}>
        <TopDestinations destinationChosen={this.destinationChosen}/>
      </div>
      <div> <Explore destinationChosen={this.destinationChosen} /> </div>
      </div>
    )
  }

  destinationChosen = (destination) => {
    this.props.viewEachDestinationPage(false)
    this.props.setChosenDestination(destination)
  }
  // <div className='mainContainer'>

  render() {
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
    chosenDestination: state.chosenDestination,
    sidebarClicked: state.sidebarClicked,
    whoIsLoggedIn: state.whoIsLoggedIn,
  }
}

export default withLastLocation(connect(mapStateToProps, actions)(Home))

import React, { Component } from "react"

import Explore from './Explore'
import TopDestinations from './TopDestinations'
import DestinationShowPage from './DestinationShowPage'

class Home extends Component {

  state = {
    pageToRender: 'explore',
    chosenDestination: {}
  }

  allDestinations = () => {
    return (
      <div>
      <Explore destinationChosen={this.destinationChosen}/>
      <TopDestinations />
      </div>
    )
  }

  destinationChosen = (destination) => {
    this.setState({
      pageToRender: 'destinationShowPage',
      chosenDestination: destination
    })
  }

  render() {
    return (
      <div>
      {this.state.pageToRender === 'explore'? this.allDestinations() : <DestinationShowPage chosenDestination={this.state.chosenDestination}/>}
      </div>
    )

  }
}

export default Home

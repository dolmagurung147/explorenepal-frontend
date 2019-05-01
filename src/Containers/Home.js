import React, { Component } from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'

import Explore from './Explore'
import TopDestinations from './TopDestinations'
import DestinationShowPage from './DestinationShowPage'

class Home extends Component {

  state = {
    chosenDestination: {}
  }

  componentDidMount() {
    this.props.fetch_tourists();
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

export default connect(mapStateToProps, actions)(Home)

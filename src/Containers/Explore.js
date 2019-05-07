import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../actions"

import DestinationCard from '../Components/DestinationCard'

import { CarouselProvider, Grid, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Explore extends Component {

  render() {
    const destinationCards = this.props.destinations.map(destinationObj => {
      return <DestinationCard key={destinationObj.id} destination={destinationObj} destinationChosen={this.props.destinationChosen}/>
    })

    const destinationCardGroup = (start) => {
      return (
        <div>
          <Grid.Column>{destinationCards[start]} </Grid.Column>
          <Grid.Column>{destinationCards[start+1]} </Grid.Column>
          <Grid.Column>{destinationCards[start+2]} </Grid.Column>
        </div>
      )
    }


    return (
      <div className='explore'>
      <h2>Explore</h2>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}><Grid.Row>{destinationCardGroup(0)}</Grid.Row></Slide>
          <Slide index={1}><Grid.Row>{destinationCardGroup(3)}</Grid.Row></Slide>
          <Slide index={2}><Grid.Row>{destinationCardGroup(6)}</Grid.Row></Slide>
        </Slider>
      </CarouselProvider>
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

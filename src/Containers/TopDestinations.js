import React from 'react'
import { connect } from 'react-redux'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import DestinationCard from '../Components/DestinationCard'

const TopDestinations = (props) => {
  console.log(props.topDestinations);

  const topDestinationsCardArr = () => {
      return props.topDestinations.map(destinationObj => {
        return <DestinationCard key={destinationObj.id} destination={destinationObj} destinationChosen={props.destinationChosen}/>
      })
  }

  return (
    <div className='manageTopMargin myCarousel'>
      <h1>Top Destinations</h1>
      <CarouselProvider
        naturalSlideWidth={75}
        naturalSlideHeight={75}
        totalSlides={5}
        isPlaying={true}
      >
        <Slider>
          <Slide index={0}>{topDestinationsCardArr()[0]}</Slide>
          <Slide index={1}>{topDestinationsCardArr()[1]}</Slide>
          <Slide index={2}>{topDestinationsCardArr()[2]}</Slide>
          <Slide index={3}>{topDestinationsCardArr()[3]}</Slide>
          <Slide index={4}>{topDestinationsCardArr()[4]}</Slide>
        </Slider>
      </CarouselProvider>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    topDestinations: state.topDestinations
  }
}

export default connect(mapStateToProps)(TopDestinations)

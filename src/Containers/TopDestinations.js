import React from 'react'
import { connect } from 'react-redux'

import DestinationCard from '../Components/DestinationCard'

const TopDestinations = (props) => {
  console.log(props.topDestinations);

  const topDestinationsCardArr = props.topDestinations.map(destinationObj => {
    return <DestinationCard key={destinationObj.id} destination={destinationObj} destinationChosen={props.destinationChosen}/>
  })

  return (
    <div>
      <h1>Top Destinations</h1>
      {topDestinationsCardArr}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    topDestinations: state.topDestinations
  }
}

export default connect(mapStateToProps)(TopDestinations)

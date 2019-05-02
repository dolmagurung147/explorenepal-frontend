import React from 'react'
import { connect } from 'react-redux'

import TouristIGuidedCard from '../Components/TouristIGuidedCard'

const TouristsGuided = (props) => {

  const findTouristsThatIGuided = () => {
    let touristIworkedWith = props.allTourists.filter(tourist => {
        return props.pastAppointments.filter(pastApp => {
          return pastApp.tourist_id === tourist.id
        }).length
      })
    return touristIworkedWith.map(touristObj => {
      return <TouristIGuidedCard key={touristObj.id} tourist={touristObj} />
    })
  }

  return (
    <div>
      <h1> TOURISTS THAT I HAVE WORKED WITH </h1>
      {props.allTourists.length > 0 ? findTouristsThatIGuided() : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allTourists: state.allTourists,
    pastAppointments: state.placesIVisited,
    state: state
  }
}

export default connect(mapStateToProps)(TouristsGuided)

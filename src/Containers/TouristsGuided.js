import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import TouristIGuidedCard from '../Components/TouristIGuidedCard'

class TouristsGuided extends Component {

  componentDidMount() {
    if (!this.props.allTourists.length) {
      this.props.fetchAllTourists();
    }
  }

  findTouristsThatIGuided = () => {
    let touristIworkedWith = this.props.allTourists.filter(tourist => {
        return this.props.pastAppointments.filter(pastApp => {
          return pastApp.tourist_id === tourist.id
        }).length
      })
    return touristIworkedWith.map(touristObj => {
      return <TouristIGuidedCard key={touristObj.id} tourist={touristObj} />
    })
  }

  render(){
    return (
      <>
      <div className='manageTopMargin ' style={{backgroundImage: "url('https://www.backpacker.com/.image/t_share/MTU3OTkxNTk4MTk2NTMyNzQw/bp1018ednote_annapurana.png')", backgroundPositionX: '56%'}}>
       <br/><h1> TOURISTS THAT I HAVE WORKED WITH </h1>
      </div>
      <div className='mainContainer touristIguided' style={{height: '900px'}}>
      {this.props.allTourists.length > 0 ? this.findTouristsThatIGuided() : null}
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allTourists: state.allTourists,
    pastAppointments: state.placesIVisited,
    state: state
  }
}

export default connect(mapStateToProps, actions)(TouristsGuided)

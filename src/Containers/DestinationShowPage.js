import React, { Component } from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Grid, Image, Button, Card, Icon } from 'semantic-ui-react'

import ViewAppointmentForm from '../Components/ViewAppointmentForm'
import RatingConversion from '../Components/RatingConversion'

class DestinationShowPage extends Component {
  state = {
    viewAppointmentForm: false,
    currentMainImage: this.props.chosenDestination.destination_images[0].image,
  }

  componentDidMount(){
    if (!this.props.allTourists.length) {
      this.props.fetchAllTourists();
      this.props.fetchDestinations();
    }
  }

  imageClickHandler = (e) => {
    this.setState({
      currentMainImage: e.target.src
    })
  }

  destinationImages = () => {
    return this.props.chosenDestination.destination_images.map((imageObj) => {
      return <Card className='moreImages' key={imageObj.id} onClick={this.imageClickHandler}><Image src={imageObj.image} alt="" style={{margin: '3%'}} className='whatever'/></Card>
      })
  }

  viewAppointmentForm = (e) => {
    e.preventDefault();
    this.setState({
      viewAppointmentForm: true
    })
  }

  toggleBackState = () => {
    this.setState({
      viewAppointmentForm: false
    })
  }

  booknow = () => {
    if (this.state.viewAppointmentForm) {
      return <ViewAppointmentForm tourist_id={this.props.loggedInuserInfo.id} destination_id={this.props.chosenDestination.id} toggleBackState={this.toggleBackState}/>
    }
    else {
      return (
        <Button primary onClick={this.viewAppointmentForm}> Book This Destination </Button >
      )
    }
  }

  exploreBackButtonHandler = (e) => {
    e.preventDefault();
    this.props.viewEachDestinationPage(true)
  }

  render() {
    console.log('THIS IS RENDERED AFTER DISPATCH');
    return (
      <div className='manageDestinationTopMargin'>
        <div className='backButton'>
        <Button  primary onClick={this.exploreBackButtonHandler}> BACK TO HOMEPAGE</Button>
        </div>
        <h1 style={{textAlign: 'center'}}>{this.props.chosenDestination.name}</h1>
        <div style={{textAlign: 'center'}}>{this.props.loggedIn && this.props.whoIsLoggedIn === 'tourist' ? this.booknow() : null}</div>
        <div className='ui divider'>
        <Grid celled='internally' id='secondRow'>
          <Grid.Row >
            <Grid.Column width={8}>
              {this.props.chosenDestination ?<img style={{maxHeight: '500px', width: "100%"}} src={this.state.currentMainImage} alt=''/> : null}
            </Grid.Column>
            <Grid.Column width={8} >
              <div className='eachDestinationShowPageImages'>
                {this.destinationImages()}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={8}>
              <div className='firstcolumn'>
              <div style={{marginLeft: '10px'}}>
              <h1> About: </h1>
              <h4> <Icon name='map marker alternate' />Location: <br/> {this.props.chosenDestination.location} </h4>
              <h4> <Icon name='chart line' />Difficulty-level: {this.props.chosenDestination.difficulty_level}</h4>
              <h4> <Icon name='dollar sign' />Charge for Tour Guide per day: $ {this.props.chosenDestination.costForThisDestination}</h4>
              <h4> <Icon name='info circle' />Short Description: <br/> {this.props.chosenDestination.about}</h4>
              <h4> <Icon name='time' />Best Time To Visit: <br/> {this.props.chosenDestination.best_time_to_visit}</h4>
              </div>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className='firstcolumn'>
                <h1> Reviews and Rating: </h1>
                <h4> Average Rating: <RatingConversion rating={this.props.chosenDestination.avgrating} /></h4>
                {this.props.chosenDestination.reviews.map(reviewObj => {
                return (
                  <div key={reviewObj.id} style={{borderStyle:'ridge', textAlign:'left'}}>
                    <div className='reviewObjects'>Reviewed By: <Icon name='user circle'/> {!this.props.allTourists.length? null : this.props.allTourists.find(tourist => tourist.id === reviewObj.tourist_id).name}  <br/>
                    Rating : <RatingConversion rating={reviewObj.rating}/> <br/>
                    Review: {reviewObj.review}</div>
                  </div>
                  )
                })}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedin,
    whoIsLoggedIn: state.whoIsLoggedIn,
    loggedInuserInfo: state.loggedInuserInfo,
    allTourists: state.allTourists,
    chosenDestination: state.chosenDestination,
    destinations: state.destinations
  }
}

export default connect(mapStateToProps, actions)(DestinationShowPage)

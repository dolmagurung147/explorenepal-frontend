import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'
import NavBar from './Components/NavBar'
import SidebarMenu from './Components/SidebarMenu'

import MainContainer from './Containers/MainContainer'

import { Grid } from 'semantic-ui-react'


class App extends Component {

  componentDidMount() {
    this.props.fetchDestinations();
    this.props.fetchAllTourGuides();
    this.props.fetchTopDestinations();
  }

  render() {
    return (
      <BrowserRouter>
        <Grid celled='internally'>
          <Grid.Row>
            <NavBar />
          </Grid.Row>
            {this.props.sidebarClicked ? <Grid.Row style={{marginTop: '54px'}}><Grid.Column width={3}>
            <SidebarMenu />
            </Grid.Column>
            <Grid.Column width={13}> <MainContainer/></Grid.Column></Grid.Row> : <Grid.Row><MainContainer/></Grid.Row>}
        </Grid>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarClicked: state.sidebarClicked
  }
}

export default connect(mapStateToProps, actions)(App);

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import MainContainer from './Containers/MainContainer'


class App extends Component {

  // componentDidMount() {
    // console.log(this.props.fetchDestinations);
    // console.log("HEY FROM APP");
  // }

  render() {
    this.props.fetchDestinations();
    this.props.fetchAllTourGuides();
    this.props.fetchAllTourists();
    return (
      <BrowserRouter>
        <MainContainer/>
      </BrowserRouter>
    );
  }

}

export default connect(null, actions)(App);

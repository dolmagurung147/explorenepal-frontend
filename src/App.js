import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

import MainContainer from './Containers/MainContainer'


class App extends Component {

  componentDidMount() {
    this.props.fetchDestinations();
  }

  render() {
    return (
      <BrowserRouter>
        <MainContainer/>
      </BrowserRouter>
    );
  }

}

export default connect(null, actions)(App);

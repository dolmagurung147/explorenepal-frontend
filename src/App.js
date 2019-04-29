import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'

import MainContainer from './Containers/MainContainer'


const App = () => {
  return (
      <BrowserRouter>
        <MainContainer/>
      </BrowserRouter>
    );

}

export default App;

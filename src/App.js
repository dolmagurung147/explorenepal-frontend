import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'

import MainContainer from './Containers/MainContainer'


function App() {
  return (
    <BrowserRouter>
      <MainContainer/>
    </BrowserRouter>
  );
}

export default App;

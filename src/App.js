import React from 'react';
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

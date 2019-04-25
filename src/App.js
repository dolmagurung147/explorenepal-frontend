import React from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './Containers/Home'

import NavBar from './Components/NavBar'

function App() {
  return (
    <div>
      <NavBar />
      <Home />
    </div>
  );
}

export default App;

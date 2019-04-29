import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux' //create a store
import { Provider } from 'react-redux' //in order to provide state to other components

import { FETCH_DESTINATIONS, LOGINUSER, SIGNUPUSER } from './actions/types'
import thunk from 'redux-thunk'


const initialState = {loggedin: false, destinations: [], whoIsLoggedIn: null, loggedInuserInfo: {}}

const reducer = (state=initialState, action) => {
  switch (action.type){
    case FETCH_DESTINATIONS:
      return{...state, destinations: action.payload}
    case SIGNUPUSER:
      let currentUser = action.payload.tour_guide ? "tour_guide" : "tourist"
      return{...state, loggedin: true, whoIsLoggedIn: currentUser, loggedInuserInfo: action.payload[currentUser]}
    case LOGINUSER:
      let userType = action.payload.userType
      return{...state, loggedin: true, whoIsLoggedIn: userType, loggedInuserInfo: action.payload[userType]}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();

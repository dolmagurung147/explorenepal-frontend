import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux' //create a store
import { Provider } from 'react-redux' //in order to provide state to other components

import { FETCH_DESTINATIONS, LOGINUSER, SIGNUPUSER, UPDATEUSER, ADDAPPOINTMENT, DELETEAPPOINTMENT } from './actions/types'
import thunk from 'redux-thunk'


const initialState = {loggedin: false, destinations: [], whoIsLoggedIn: null, loggedInuserInfo: {}, myDestinations: {}, myAppointments: []}

const reducer = (state=initialState, action) => {
  switch (action.type){
    case FETCH_DESTINATIONS:
      return{...state, destinations: action.payload}
    case SIGNUPUSER:
      let currentUser = action.payload.tour_guide ? "tour_guide" : "tourist"
      return{...state, loggedin: true, whoIsLoggedIn: currentUser, loggedInuserInfo: action.payload.user, myAppointments: action.payload.user.appointments}
    case LOGINUSER:
      let userType = action.payload.userType
      return{...state, loggedin: true, whoIsLoggedIn: userType, loggedInuserInfo: action.payload.user , myAppointments: action.payload.user.appointments}
    case UPDATEUSER:
      return{...state, loggedInuserInfo: action.payload.updatedinfo}
    case ADDAPPOINTMENT:
      return {...state, myAppointments: [...state.myAppointments, action.payload.newAppointment]}
    case DELETEAPPOINTMENT:
    debugger
      return {...state, myAppointments: state.myAppointments.filter(myAppointment => myAppointment.id !== action.payload)}
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux' //create a store
import { Provider } from 'react-redux' //in order to provide state to other components

import { FETCH_DESTINATIONS,
  LOGINUSER,
  SIGNUPUSER,
  UPDATEUSER,
  ADDAPPOINTMENT,
  DELETEAPPOINTMENT,
  EDITAPPOINTMENT,
  TOGGLEEXPLOREPAGE,
  LOGOUT,
  SETCHOSENDESTINATION,
  FETCHALLTOURGUIDES,
  FETCHALLTOURISTS,
  FETCHTOPDESTINATIONS
} from './actions/types'
import thunk from 'redux-thunk'


const initialState = {
  loggedin: false,
  destinations: [],
  whoIsLoggedIn: null,
  loggedInuserInfo: {},
  myDestinations: {},
  myAppointments: [],
  placesIVisited:[],
  explorePageToRender: true,
  whichPageTorenderOnBackButton: '/home',
  chosenDestination: {},
  allTourGuides: [],
  allTourists: [],
  topDestinations: []
}

const reducer = (state=initialState, action) => {
  switch (action.type){
    case FETCH_DESTINATIONS:
      return{...state, destinations: action.payload}
    case SIGNUPUSER:
      let currentUser = action.payload.tour_guide ? "tour_guide" : "tourist"
      return{...state,
         loggedin: true,
         whoIsLoggedIn: currentUser,
         loggedInuserInfo: action.payload.user,
         myAppointments: action.payload.user ? action.payload.user.appointments.filter(app => Date.parse(app.date_and_time) > Date.now()) : [] ,
         placesIVisited: action.payload.user ? action.payload.user.appointments.filter(app => Date.parse(app.date_and_time) < Date.now()) : []
       }
    case LOGINUSER:
      let userType = action.payload.userType
      return{...state,
        loggedin: true,
        whoIsLoggedIn: userType,
        loggedInuserInfo: action.payload.user ,
        myAppointments: action.payload.user ? action.payload.user.appointments.filter(app => Date.parse(app.date_and_time) > Date.now()) : [] ,
        placesIVisited: action.payload.user ? action.payload.user.appointments.filter(app => Date.parse(app.date_and_time) < Date.now()) : []
      }
    case UPDATEUSER:
      return{...state, loggedInuserInfo: action.payload.updatedinfo}
    case ADDAPPOINTMENT:
      return {...state, myAppointments: [...state.myAppointments, action.payload.newAppointment]}
    case DELETEAPPOINTMENT:
      return {...state, myAppointments: state.myAppointments.filter(myAppointment => myAppointment.id !== action.payload)}
    case EDITAPPOINTMENT:
      return {...state, myAppointments: [...state.myAppointments.filter(myAppointment => myAppointment.id !== action.payload.id), action.payload].sort((a,b) => a.id - b.id)}
    case TOGGLEEXPLOREPAGE:
      return {...state, explorePageToRender: action.payload}
    case FETCHALLTOURGUIDES:
      return {...state, allTourGuides: action.payload}
    case FETCHALLTOURISTS:
      return {...state, allTourists: action.payload}
    case FETCHTOPDESTINATIONS:
      return {...state, topDestinations: action.payload}
    case LOGOUT:
      return {
        ...state,
      loggedin: false,
      whoIsLoggedIn: null,
      loggedInuserInfo: {},
      myDestinations: {},
      myAppointments: [],
      placesIVisited:[],
      explorePageToRender: true}
    case SETCHOSENDESTINATION:
      return {...state, chosenDestination: action.payload}
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

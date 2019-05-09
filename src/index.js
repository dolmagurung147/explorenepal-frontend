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
  FETCHTOPDESTINATIONS,
  ADDREQUESTFORAPPOINTMENTS,
  DELETEREQUESTFORAPPOINTMENTS,
  TOGGLESIDEBAR,
  ADDNEWREVIEW,
  ADDNEWTOURISTREVIEW,
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
  topDestinations: [],
  requestForAppointments: [],
  sidebarClicked: false
}

const reducer = (state=initialState, action) => {
  // action.payload will look like {id: 19, destiation_id: 2, comment: "Beautiful peaceful place"}
  // ADD_REVIEW

  switch (action.type){
    case FETCH_DESTINATIONS:
      return{...state, destinations: action.payload}
    case SIGNUPUSER:
      debugger
      let currentUser = action.payload.tour_guide ? "tour_guide" : "tourist"
      return{...state,
        loggedin: true,
        whoIsLoggedIn: currentUser,
        loggedInuserInfo: action.payload[currentUser],
        myAppointments: action.payload[currentUser] ? action.payload[currentUser].appointments.filter(app => Date.parse(app.date_and_time) > Date.now()) : [] ,
        placesIVisited: action.payload[currentUser] ? action.payload[currentUser].appointments.filter(app => Date.parse(app.date_and_time) < Date.now()) : [],
        requestForAppointments: action.payload[currentUser] ? action.payload[currentUser].request_for_appointments : null
       }
    case LOGINUSER:
      let userType = action.payload.userType
      return{...state,
        loggedin: true,
        whoIsLoggedIn: userType,
        loggedInuserInfo: action.payload.user ,
        myAppointments: action.payload.user ? action.payload.user.appointments.filter(app => Date.parse(app.date_and_time) > Date.now()) : [] ,
        placesIVisited: action.payload.user ? action.payload.user.appointments.filter(app => Date.parse(app.date_and_time) < Date.now()) : [],
        requestForAppointments: action.payload.user ? action.payload.user.request_for_appointments : null
      }
    case UPDATEUSER:
      return{...state, loggedInuserInfo: action.payload.updatedinfo}
    case ADDAPPOINTMENT:
      return {...state, myAppointments: [...state.myAppointments, action.payload]}
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
    case ADDREQUESTFORAPPOINTMENTS:
      return {...state, requestForAppointments: [...state.requestForAppointments, action.payload]}
    case DELETEREQUESTFORAPPOINTMENTS:
      return {...state, requestForAppointments: state.requestForAppointments.filter(request => request.id !== action.payload.id)}
    case TOGGLESIDEBAR:
      return {...state, sidebarClicked: !state.sidebarClicked}
    case ADDNEWREVIEW:
      const newdestination = state.destinations.length ? state.destinations.find(destination => destination.id === action.payload.destination_id) : null
      newdestination.reviews.push(action.payload)
      debugger
      return {...state, destinations: [...state.destinations.filter(destination => destination.id !== newdestination.id), newdestination].sort((a,b) => a.id - b.id)}
    case ADDNEWTOURISTREVIEW:
      const newTourist = state.allTourists.length ? state.allTourists.find(tourist => tourist.id === action.payload.tourist_id) : null
      newTourist.tour_guide_reviews.push(action.payload)
      return {...state, allTourists: [...state.allTourists.filter(tourist => tourist.id !== newTourist.id), newTourist].sort((a,b) => a.id - b.id)}
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

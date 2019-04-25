import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux' //create a store
import { Provider } from 'react-redux' //in order to provide state to other components

import { FETCH_DESTINATIONS } from './actions/types'
import thunk from 'redux-thunk'


const initialState = {loggedin: false, destinations: []}

const reducer = (state=initialState, action) => {
  console.log(action);
  switch (action.type){
    case FETCH_DESTINATIONS:
      return{...state, destinations: action.payload}
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

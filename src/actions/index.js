import {
  FETCH_DESTINATIONS,
  LOGINUSER
} from './types'


export const fetchDestinations = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/destinations')
    .then(res => res.json())
    .then(destinations => {
      dispatch({type: FETCH_DESTINATIONS, payload: destinations})
    })
  }
}

export const tourguideSignUp = (newTourGuide) => {
  return (dispatch) => {
    fetch('http://localhost:3000/tour_guides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        tour_guide: newTourGuide
      })
    })
    .then(res => res.json())
    .then(response => {
      // {tour_guide: {…}, token: "eyJhbGciOiJIUzI1NiJ9.eyJ0b3VyX2d1aWRlX2lkIjoyNH0.yWg694VilOlRnk8qYNen4KEuQukrEIk2wW83rEv1mPc"}
      dispatch({type: LOGINUSER, payload: response})
    })
  }
}

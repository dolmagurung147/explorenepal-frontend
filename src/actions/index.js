import {
  FETCH_DESTINATIONS
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

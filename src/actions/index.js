import {
  FETCH_DESTINATIONS,
  LOGINUSER,
  SIGNUPUSER
} from './types'


export const fetchDestinations = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/destinations', {
      headers: {
        'authorization' : localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(destinations => {
      dispatch({type: FETCH_DESTINATIONS, payload: destinations})
    })
  }
}

export const newUserSignUp = (newUser, type) => {
  let userType = type
  return (dispatch) => {
    fetch(`http://localhost:3000/${userType}s`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        [userType]: newUser
      })
    })
    .then(res => res.json())
    .then(response => {
      dispatch({type: SIGNUPUSER, payload: response})
      localStorage.setItem('userType', userType)
      localStorage.setItem("token", response.token)
    })
  }
}


export const login = (token, usertype) => {
  return dispatch => {
    fetch('http://localhost:3000/login', {
      method: 'GET',
      headers: {
        'Authorization': token,
        'user': usertype
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          dispatch({ type: 'LOGINUSER', payload: {user:data.user, userType: usertype}})
        }
      })
    }
  }

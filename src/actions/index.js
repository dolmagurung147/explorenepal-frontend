import {
  FETCH_DESTINATIONS,
  LOGINUSER,
  SIGNUPUSER
} from './types'


export const fetchDestinations = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/destinations', {
      headers: {
        'authorization' : localStorage.getItem('token'),
        'user' : localStorage.getItem('userType')
      }
    })
    .then(res => res.json())
    .then(destinations => {
      dispatch({type: FETCH_DESTINATIONS, payload: destinations})
      console.log(destinations);
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

export const login = (user, type) => ({
  type: 'LOGINUSER', payload: {user: user, userType: type}
})
//
// export const auto_login = (usertype) => {
//   return dispatch => {
//     fetch('http://localhost:3000/login', {
//       method: 'GET',
//       headers: {
//         'authorization': localStorage.getItem('token'),
//         'user': usertype
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.errors) {
//           alert(data.errors)
//         } else {
//           // console.log(data);
//           dispatch({ type: 'LOGINUSER', payload: {user:data.user, userType: usertype}})
//           // localStorage.setItem('userType', usertype)
//           // localStorage.setItem("token", token)
//         }
//       })
//     }
//   }

export const matchUserforLogin = (username, password, type) => {
  return dispatch => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accepts': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: {username: username, password: password, type: type}
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        console.log(data);
        localStorage.setItem('token', data.token)
        localStorage.setItem('userType', type)
        dispatch({ type: 'LOGINUSER', payload: {user:data.user, userType: type}})
      }
    })

  }
}

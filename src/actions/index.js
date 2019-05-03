import {
  FETCH_DESTINATIONS,
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
  FETCHALLTOURISTS
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
      localStorage.setItem('userType', userType)
      localStorage.setItem("token", response.token)
      dispatch({type: SIGNUPUSER, payload: response})
    })
  }
}


export const auto_login = (token, usertype) => {
  return dispatch => {
    fetch('http://localhost:3000/login', {
      method: 'GET',
      headers: {
        'authorization': token,
        'user': usertype
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          dispatch({ type: LOGINUSER, payload: {user:data.user, userType: usertype}})
        }
      })
    }
  }

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
        localStorage.setItem('token', data.token)
        localStorage.setItem('userType', type)
        dispatch({ type: LOGINUSER, payload: {user:data.user, userType: type}})
      }
    })
  }
}

export const updateUserInfo = (updatedInfo, type, user_id) => {
  return dispatch => {
    fetch(`http://localhost:3000/${type}s/${user_id}` , {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        [type]: {
          name: updatedInfo.name,
          profile_picture: updatedInfo.profile_picture,
          username: updatedInfo.username,
          short_bio: updatedInfo.short_bio,
          date_of_birth: updatedInfo.date_of_birth
        }
      })
    })
    .then (res => res.json())
    .then (user => {
      dispatch({type: UPDATEUSER, payload: {updatedinfo: user}})
    })
  }
}

export const addNewAppointment = (appointment) => {
  return dispatch => {
    dispatch({type: ADDAPPOINTMENT, payload: {newAppointment: appointment}})
  }
}

export const deleteAppointment = (appointment_id) => {
  return dispatch => {
    fetch(`http://localhost:3000/appointments/${appointment_id}`, {
      method: 'DELETE'
    })
    .then (res => res.json())
    .then (deletedApp => {
      dispatch({type: DELETEAPPOINTMENT, payload: deletedApp.id})
    })
  }
}

export const editAppointment = (appointment_id, date_and_time) => {
  return dispatch => {
    fetch(`http://localhost:3000/appointments/${appointment_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date_and_time: date_and_time
      })
    })
    .then (res => res.json())
    .then (editedApp => {
      dispatch({type: EDITAPPOINTMENT, payload: editedApp})
    })
  }
}


export const viewEachDestinationPage = (status) => {
  return dispatch => {
    dispatch({type: TOGGLEEXPLOREPAGE, payload: status })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({type: LOGOUT})
  }
}

export const setChosenDestination = (chosenDest) => {
  return dispatch => {
    dispatch({type: SETCHOSENDESTINATION, payload: chosenDest})
  }
}

export const fetchAllTourGuides = () => {
  return dispatch => {
    fetch('http://localhost:3000/tour_guides')
        .then (res => res.json())
        .then (tour_guides => {
          dispatch({type: FETCHALLTOURGUIDES, payload: tour_guides})
        })
  }
}

export const fetchAllTourists = () => {
  return dispatch => {
    fetch('http://localhost:3000/tourists')
    .then (res => res.json())
    .then (tourists => {
      dispatch({type: FETCHALLTOURISTS, payload: tourists})
    })
  }
}

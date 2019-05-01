import React from 'react'
import { connect } from 'react-redux'
import MyAppointmentCard from '../Components/MyAppointmentCard'
import * as actions from '../actions'

const MyAppointments = (props) => {

  const myAppointmentCards = () => {
    console.log(props)
      return (
        props.myAppointments.map(myAppointmentObj => {
          return <MyAppointmentCard key={myAppointmentObj.id} myAppointment={myAppointmentObj}/>
        })
      )
  }

  return (
    <div>
      <h1>MY APPOINTMENTS </h1>
      {myAppointmentCards()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    myAppointments: state.myAppointments
  }
}

export default connect(mapStateToProps)(MyAppointments)

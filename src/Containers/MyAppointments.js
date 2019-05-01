import React from 'react'
import { connect } from 'react-redux'
import MyAppointmentCard from '../Components/MyAppointmentCard'

const MyAppointments = (props) => {

  const myAppointmentCards = () => {
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

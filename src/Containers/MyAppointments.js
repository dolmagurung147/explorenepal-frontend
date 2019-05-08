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

  const noAppointmentYet = () => {
    return (
      <div>
        <h1> No appointment yet </h1>
      </div>
    )
  }

  return (
    <div className='manageTopMargin'>
      <h1>MY APPOINTMENTS </h1>
      {props.myAppointments.length > 0 ?  myAppointmentCards() : noAppointmentYet() }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    myAppointments: state.myAppointments,
    state: state
  }
}

export default connect(mapStateToProps)(MyAppointments)

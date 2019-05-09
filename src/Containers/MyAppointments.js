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
    <div className='mainContainer'>
      <h1 id='lol' className='manageTopMargin '>MY APPOINTMENTS </h1>
      <div className='appointmentContainer mainContainer' style={{height: '915px'}}>
        {props.myAppointments.length > 0 ?  myAppointmentCards() : noAppointmentYet() }
      </div>
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

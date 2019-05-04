import React from 'react'
import { connect } from 'react-redux'

import MyRequestCard from '../Components/MyRequestCard'

const MyRequests = (props) => {

  const myRequestCardsArr = () => {
    return props.requestForAppointments.map(requestObj => {
      return <MyRequestCard request={requestObj} key={requestObj.id}/>
    })
  }

  return (
    <div>
      MY REQUESTS <br/><br/>
      {myRequestCardsArr()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    requestForAppointments: state.requestForAppointments,
  }
}

export default connect(mapStateToProps)(MyRequests);

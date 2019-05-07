import React from 'react'

const ShowMyProfile = (props) => {
  return (
    <div className='manageTopMargin'>
      <h1>MY Profile </h1>
      <h1>{props.userInfo.name} </h1>
      <img src={props.userInfo.profile_picture} alt=''/>
      <p>Username : {props.userInfo.username}</p>
      <p>Short-Bio: {props.userInfo.short_bio}</p>
      <p>Date of Birth: {props.userInfo.date_of_birth}</p>
      <button onClick={props.editMyProfileHandler}> EDIT MY PROFILE </button>
    </div>
  )
}

export default ShowMyProfile

import React from 'react'
import { Button, Image } from 'semantic-ui-react'

const ShowMyProfile = (props) => {
  return (
    <div className='manageTopMargin manageHeight'>
      <h1>MY Profile </h1>

      <div className='profileInfo'>
        <div className='manageTopMargin '>
          <h2>{props.userInfo.name} </h2>
          <Image src={props.userInfo.profile_picture} alt='' style={{maxHeight: '450px', margin: 'auto'}}/>
          <h4>Username : {props.userInfo.username}</h4>
          <h4>Short-Bio: {props.userInfo.short_bio}</h4>
          <h4>Date of Birth: {props.userInfo.date_of_birth}</h4> <br />
          <Button primary onClick={props.editMyProfileHandler}> EDIT MY PROFILE </Button>
        </div>
      </div>
    </div>
  )
}

export default ShowMyProfile

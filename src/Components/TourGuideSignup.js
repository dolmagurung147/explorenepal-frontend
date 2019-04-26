import React from 'react'

const TourGuideSignup = () => {
  return (
    <div>
      <h1> TOUR GUIDE SIGNUP PAGE </h1>
      <form>
        Name: <input type="text" name="name" />
        Profile Picture: <input type="text" name="profile-picture" />
        Username: <input type="text" name="username" />
        Password: <input type="password" name="password" />
        Short-Bio: <input type="text" name="short-bio" />
        Picture-Id: <input type="text" name="picture-id" />
      </form>
    </div>
  )
}

export default TourGuideSignup

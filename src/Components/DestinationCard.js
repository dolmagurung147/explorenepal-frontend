import React from 'react'

const DestinationCard = (props) => {
  let imageArr = props.destination.destination_images
  let image = imageArr[Math.floor(Math.random()*imageArr.length)]
  return(
    <div>
      <img src={image.image} alt=''/>
      <br />
      {props.destination.name}
    </div>
  )
}

export default DestinationCard

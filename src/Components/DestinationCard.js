import React from 'react'

const DestinationCard = (props) => {
  let imageArr = props.destination.destination_images
  let image = imageArr[Math.floor(Math.random()*imageArr.length)]

  function imageClickHandler() {
    props.destinationChosen(props.destination)
  }

  return(
    <div className='eachDestinationCard'>
      <img src={image.image} alt='' onClick={imageClickHandler}/>
      <br />
      {props.destination.name}
    </div>
  )
}

export default DestinationCard

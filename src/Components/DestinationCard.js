import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const DestinationCard = (props) => {
  let imageArr = props.destination.destination_images
  // let image = imageArr[Math.floor(Math.random()*imageArr.length)]
  let image = imageArr[2]

  function imageClickHandler() {
    props.destinationChosen(props.destination)
  }

  return(
    <div className='eachDestinationCard'>
      <Card style={{ margin: 'auto', width: `${props.width}` }}>
      <Image src={image.image} alt='' onClick={imageClickHandler} style={{height: `${props.width ? 'auto' : '300px'}`, width: `${props.width}`}}/>
        <br />
        <h4>{props.destination.name}</h4></Card>
    </div>
  )
}

export default DestinationCard

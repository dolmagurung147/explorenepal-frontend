import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const DestinationCard = (props) => {
  let imageArr = props.destination.destination_images
  let image = imageArr[0]

  function imageClickHandler() {
    props.destinationChosen(props.destination)
  }

  return(
    <div className='eachDestinationCard'>
      <Card style={{ margin: 'auto', width: `${props.width}` }}>
      <Image src={image.image} alt='' onClick={imageClickHandler} style={{height: `${props.width ? 'auto' : '300px'}`, width: `${props.width}`}}/>
        <br />
        <h3 style={{fontFamily: 'Pacifico'}}>{props.destination.name}</h3></Card>
    </div>
  )
}

export default DestinationCard

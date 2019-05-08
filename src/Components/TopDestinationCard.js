import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const TopDestinationCard = (props) => {
  let imageArr = props.destination.destination_images
  let image = imageArr[2]

  function imageClickHandler() {
    props.destinationChosen(props.destination)
  }

  return(
    <div className='eachTopDestinationCard'>
      <Card style={{ margin: 'auto', width: `${props.width}` , backgroundColor:'rgb(155, 217, 228)'}}>
      <Image src={image.image} alt='' onClick={imageClickHandler} style={{height: `${props.width ? 'auto' : '300px'}`, width: `${props.width}`}}/>
        <br />
        <h3 style={{fontFamily: 'Pacifico'}}>{props.destination.name}</h3></Card>
    </div>
  )
}

export default TopDestinationCard

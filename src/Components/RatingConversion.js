import React from 'react'
import { Icon } from 'semantic-ui-react'

const RatingConversion = (props) => {

  let absoluteNumber = Math.floor(props.rating)
  let remainingRating = 5 - props.rating
  let halfStar;
  if (Math.floor(remainingRating) === remainingRating) {
    halfStar = 0;
  } else {
    halfStar = <Icon name='star half'/>
  }

  const fullStars = [...Array(absoluteNumber)].map(star => <Icon name='star'/>)
  const emptyStars = [...Array(Math.floor(remainingRating))].map(star => <Icon name='star outline'/>)
  return (
    <div>
      <span>
        {fullStars}
        {halfStar ? halfStar : null}
        {Math.floor(remainingRating) ? emptyStars : null}
      </span>
    </div>
  )
}

export default RatingConversion

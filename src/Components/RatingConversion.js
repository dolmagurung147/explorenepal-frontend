import React from 'react'
import { Icon } from 'semantic-ui-react'

const RatingConversion = (props) => {
  let absoluteNumber = Math.abs(props.rating)
  let remainingRating = 5 - props.rating
  let halfStar;
  if (Math.abs(remainingRating) === remainingRating) {
    halfStar = 0;
  } else {
    halfStar = <Icon name='star half'/>
  }

  // {absoluteNumber ? absoluteNumber.forEach(n => <Icon name='star' />) : null}
  // {Math.abs(remainingRating) ? Math.abs(remainingRating).forEach(n => <Icon name='star outline'/>) : null}

  return (
    <div>
      {halfStar ? halfStar : null}
    </div>
  )
}

export default RatingConversion

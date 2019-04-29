import React, { Component } from "react"

const DestinationShowPage = (props) => {
  console.log(props);
  return (
    <div>
    {props.chosenDestination.name}
    </div>
  )
}

export default DestinationShowPage

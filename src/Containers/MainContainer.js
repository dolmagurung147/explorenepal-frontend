import React from "react"
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import NavBar from '../Components/NavBar'

const MainContainer = () => {
  return (
    <div>
      <NavBar />
      <Switch>
            <Route exact path ="/home" render={()=> <Home / >}/>
            <Route exact path="/login" render={()=> <Login />}/>
      </Switch>
    </div>
  )
}

export default MainContainer

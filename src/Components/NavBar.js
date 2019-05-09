import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

import * as actions from '../actions'

const NavBar = (props) => {

  const sidebarClickHandler = () => {
    props.toggleSidebarClick();
  }

  return (
    <header className='NavBar'>
      <Menu secondary>
        <Menu.Item as='a' onClick={sidebarClickHandler}>
          <Icon name='sidebar' />
        </Menu.Item>
        <Menu.Item name='Home' as='a' as={Link} to="/home" style={{fontFamily: 'Pacifico'}}>
          <Icon name='home' />Home
        </Menu.Item>
        {props.loggedin ? <Menu.Menu position='right' className='loginLogoutBtn'><Menu.Item name='Logout' as={Link} to='/' onClick={() => logOut(props)} style={{fontFamily: 'Pacifico'}}/> </Menu.Menu> : <Menu.Menu position='right'><Menu.Item name='Login or Signup' as={Link} to='/login' style={{fontFamily: 'Pacifico'}}/></Menu.Menu>}
      </Menu>
    </header>
  )
}


const logOut = (props) => {
  localStorage.removeItem('token')
  localStorage.removeItem('userType')
  props.logout()
}



const mapStateToProps = (state) => {
  return {
    loggedin: state.loggedin,
  }
}

export default withRouter(connect(mapStateToProps, actions)(NavBar))

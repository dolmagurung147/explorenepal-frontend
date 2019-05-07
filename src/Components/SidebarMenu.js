import React from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Header } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

const SidebarMenu = (props) => {

  const check = () => {
    if (props.whoIsLoggedIn === 'tourist') {
      return (
        <Menu.Item name='placesIVisited' as='a' as={Link} to="/placesIVisited">
          <Icon name='globe' /> Places I have vistited
        </Menu.Item>
      )
    } else if (props.whoIsLoggedIn === 'tour_guide') {
      return (
        <Menu.Item name='touristsGuided' as='a' as={Link} to="/touristsGuided">
          <Icon name='users' />  Tourists I have guided
        </Menu.Item>
      )
    }
  }

  const loggedInNavBar = () => {
    return (
      <div>
          <Menu.Item as='a' as={Link} to='/myProfile'>
          <Icon name='user circle' />
          My Profile
          </Menu.Item>
          <Menu.Item as='a' as={Link} to='/myAppointments'>
            <Icon name='th list' />
            My Appointments
          </Menu.Item>
          <Menu.Item as='a' as={Link} to='/myRequests'>
            <Icon name='comment alternate outline' />
            My Requests
          </Menu.Item>
            {props.whoIsLoggedIn ? check(props) : null}
      </div>
    )
  }


  return (
    <div>
      {props.loggedin ? loggedInNavBar() : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    whoIsLoggedIn: state.whoIsLoggedIn,
    loggedin: state.loggedin
  }
}

export default withRouter(connect(mapStateToProps)(SidebarMenu))

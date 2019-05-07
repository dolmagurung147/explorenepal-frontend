import React from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Header, Divider, Segment } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

const SidebarMenu = (props) => {

  const check = () => {
    if (props.whoIsLoggedIn === 'tourist') {
      return (
        <Menu.Item name='placesIVisited' as='a' as={Link} to="/placesIVisited">
          <h4><Icon name='globe' /> Places I have vistited</h4>
        </Menu.Item>
      )
    } else if (props.whoIsLoggedIn === 'tour_guide') {
      return (
        <Menu.Item name='touristsGuided' as='a' as={Link} to="/touristsGuided">
          <h4><Icon name='users' /> Tourists I have guided</h4>
        </Menu.Item>
      )
    }
  }

  const loggedInNavBar = () => {
    return (
      <div>
          <Menu.Item as='a' as={Link} to='/myProfile'>
          <h4><Icon name='user circle' />
          My Profile</h4>
          </Menu.Item>
          <Divider inverted />
          <Menu.Item as='a' as={Link} to='/myAppointments'>
            <h4><Icon name='th list' />
            My Appointments</h4>
          </Menu.Item>
          <Divider inverted />
          <Menu.Item as='a' as={Link} to='/myRequests'>
            <h4><Icon name='comment alternate outline' />
            My Requests</h4>
          </Menu.Item>
          <Divider inverted />
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

'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Navbar as MDBNavbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact'
import userManager from '../Authentication/userManager'
import { ssoBaseURL } from '../../config/ssoBaseURL'
import { locale } from 'moment';

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  let { navigation: { locationHash }} = state
  return { user, locationHash }
}

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    }

    this.onClick = this.onClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.LoginLogout = this.LoginLogout.bind(this)
    this.GetUser = this.GetUser.bind(this)
    this.Register = this.Register.bind(this)
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  LoginLogout() {

    let { user } = this.props

    if (!user || user.expired) {
      return <a className="nav-link" href="#/login">Login</a>
    }
    else {
      return <a className="nav-link" href="#/logout">Logout</a>
    }
  }

  Register() {
    let { user } = this.props

    if (!user || user.expired) {
      return <a key="lnkRegister" className="nav-link" href={ssoBaseURL + "Account/Register"} target="_blank">Register</a>
    }
  }

  GetUser() {
    let { user } = this.props

    if (!user || user.expired) {
      return <span style={{ color: "#d0d6e2" }} className="nav-link"></span>
    }
    else {
      return <span style={{ color: "#d0d6e2" }} className="nav-link">{"Hello, " + user.profile.email}</span>
    }
  }

  makeNavLink(hash, text) {

    let { locationHash } = this.props

    return (
      <NavItem active={locationHash === hash}>
        <a className="nav-link" href={hash}>{text}</a>
      </NavItem>
    )
  }

  render() {

    return (
      <MDBNavbar size="sm" color="blue darken-2" expand="md" dark >
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>

          <NavbarBrand tag="span">
            <b>React Boilerplate &amp; Templates</b>
          </NavbarBrand>

          <NavbarNav left>
            {this.makeNavLink("#/", "Home")}
            {this.makeNavLink("#/comp", "Components")}
            {this.makeNavLink("#/list", "List-View")}
            {this.makeNavLink("#/dash", "Dashboard")}
          </NavbarNav>

          <NavbarNav right>
            <NavItem>
              {this.GetUser()}
            </NavItem>
            <NavItem>
              {this.LoginLogout()}
            </NavItem>
            <NavItem>
              {this.Register()}
            </NavItem>
          </NavbarNav>

        </Collapse>
      </MDBNavbar>
    )
  }
}

export default connect(mapStateToProps)(Navbar)
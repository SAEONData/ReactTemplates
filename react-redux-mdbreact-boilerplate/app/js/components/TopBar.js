'use strict'

import React from 'react'
import { connect, Provider } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router'
import { hashHistory } from 'react-router'

import {
  Navbar,
  NavItem,
  NavbarNav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
  Container
} from 'mdbreact'

//import Upload from './Upload.jsx'
//import UploadCSV from './UploadCSV.jsx'

const style = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: "15px",
}, buttonContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'center',
  width: "100%",
  height: '100px',
  flex: 100
}, componentStyle = {
  margin: '5px'
}

/**
* mapDispatchToProps
* @ignore
*/
const mapDispatchToProps = (dispatch) => {
}

/**
* mapStateToProps
* @ignore
*/
const mapStateToProps = (state, ownProps) => {
  return {

  }
}
/**
* UserMenu
* @class
*/
class TopBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    }

    this.onClick = this.onClick.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  componentWillMount() {
    // auth code here
  }

  navLink(name, path, active = false) {
    if (!path) path = name
    if (active) {
      return (
        <NavItem active className="rounded">
          <NavLink className="nav-link" to={path} onTouchTap={() => window.location.hash = path}>{name}</NavLink>
        </NavItem>
      )
    }
    return (
      <NavItem className="rounded">
        <NavLink className="nav-link" to={path} onTouchTap={() => window.location.hash = path}>{name}</NavLink>
      </NavItem>
    )
  }

  /**
   * Generate a dropdown list
   * @param {*} schema Should be an object with { name, list: [ {name, path}, ...] }
   */
  dropdown(state, schema) {
    const { name, list } = schema
    if (!state[name]) state[name] = {}
    state[name].dropdownOpen = () => false
    state[name].toggle = false
    return (
      <Dropdown isOpen={state[name].dropdownOpen} toggle={state[name].toggle}>
        <DropdownToggle nav caret>{name}</DropdownToggle>
        <DropdownMenu>
          {list.map(item => (<DropdownItem href={item.path}>{item.name}</DropdownItem>))}
        </DropdownMenu>
      </Dropdown>
    )
  }

  render() {
    const { navLink, dropdown, state } = this
    return (
      <Navbar color="deep-purple lighten-2 rounded" dark expand="md" scrolling>
          <NavbarBrand href="/">
            <strong>Test site</strong>
          </NavbarBrand>
          {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav className="ml-auto">
              {navLink("Home", "/home")}
              {navLink("Music", "/music")}
              {navLink("About", "/about")}
              <NavItem>
                {/*dropdown(state, { name: "Test", list: [{ name: 'Test1', path: "#"}, {name: "Test2", path: "#"}] }) */}
              </NavItem>

            </NavbarNav>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              </form>
          </Collapse>
      </Navbar>
    )
  }
}

/**
* Export
* @ignore
*/
export default connect()(TopBar)
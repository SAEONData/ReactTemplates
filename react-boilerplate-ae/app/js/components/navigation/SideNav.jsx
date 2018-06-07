'use strict'

import React from 'react'
import { SideNav as MSBSideNav, SideNavNav, SideNavCat, SideNavItem, Fa } from 'mdbreact'


class SideNav extends React.Component {

  constructor(props) {
    super(props)

    this.state = { navCat1: true }
  }

  // Collapse/Accordion
  navCat1Click() {
    this.setState({ navCat1: !this.state.navCat1 })
  }

  render() {

    let { isOpen } = this.props
    let { navCat1 } = this.state

    return (
      <MSBSideNav hidden isOpenWithButton={isOpen} breakWidth={1300} className="blue darken-3">
        <br />
        <div className="text-center">
          <h4>React Boilerplate &amp; Templates</h4>
        </div>
        <hr />


        <SideNavNav>
          <SideNavCat name="Links" isOpen={navCat1} onClick={this.navCat1Click.bind(this)} icon="chevron-right">
            <SideNavItem onClick={() => location.hash = "#/"}>Home</SideNavItem>
            <SideNavItem onClick={() => location.hash = "#/components"}>Components</SideNavItem>
          </SideNavCat>
        </SideNavNav>
      </MSBSideNav>
    )
  }
}

export default SideNav
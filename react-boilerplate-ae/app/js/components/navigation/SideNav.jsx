'use strict'

import React from 'react'
import { SideNav as MSBSideNav, SideNavNav, SideNavCat, SideNavItem, Fa } from 'mdbreact'

import '../../../css/mdbreact-sidenav.css'

class SideNav extends React.Component {

  constructor(props) {
    super(props)

    this.renderLinks = this.renderLinks.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.state = { navOpen: []}
  }

  toggleNav(key){

    let { navOpen } = this.state

    if(navOpen.includes(key)){
      navOpen = navOpen.filter(x => x !== key)
    }
    else{
      navOpen.push(key)
    }

    this.setState({ navOpen })

  }

  renderLinks(data, level = 0) {

    let { navOpen } = this.state
    let links = []
    let indent = (level > 1 ? 26 * (level - 1) : 0) + "px"

    data.forEach(x => {

      if (typeof x.children !== 'undefined') {
        links.push(
          <SideNavCat
            style={{ fontSize: "15px", fontWeight: "400" }}
            isOpen={navOpen.includes(x.id)} 
            key={x.id}
            onClick={() => this.toggleNav(x.id)}
            name={x.text}
            icon="chevron-right" >
            {this.renderLinks(x.children, level + 1)}
          </SideNavCat>
        )
      }
      else {
        if (typeof x.link !== 'undefined') {
          links.push(
            <SideNavItem key={x.id} onClick={() => window.open(x.link, "blank")}>
              <Fa style={{ marginLeft: indent }} icon="link" />
              {x.text}
            </SideNavItem>
          )
        }
        else {
          links.push(
            <SideNavItem key={x.id}>
              <Fa style={{ marginLeft: indent }} icon="unlink" />
              {x.text}
            </SideNavItem>
          )
        }
      }


    })

    return links
  }

  render() {

    let { isOpen, title, data } = this.props

    return (
      <MSBSideNav hidden isOpenWithButton={isOpen} breakWidth={1300} className="blue darken-3">
        <br />
        <div className="text-center">
          <h4>{title}</h4>
        </div>
        <hr />

        <SideNavNav style={{ width: "400px" }}>
          {this.renderLinks(data)}
        </SideNavNav>

      </MSBSideNav>
    )
  }
}

export default SideNav
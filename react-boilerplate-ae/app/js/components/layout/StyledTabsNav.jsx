'use strict'

import React from 'react'
import { Nav } from 'mdbreact'

class StyledTabsNav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { children } = this.props

    return (
      <Nav pills color="primary" className="nav" style={{ borderBottom: "1px solid #727272", marginBottom: "-15px" }}>
        {children}
      </Nav>
    )
  }
}

export default StyledTabsNav
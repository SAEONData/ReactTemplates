'use strict'

import React from 'react'
import { TabContent } from 'mdbreact'

class StyledTabsContent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { children, activeItem } = this.props

    return (
      <TabContent activeItem={activeItem} style={{ borderBottom: "1px solid #727272" }}>
        {children}
      </TabContent>
    )
  }
}

export default StyledTabsContent
'use strict'

import React from 'react'
import { Collapse } from 'mdbreact'

class FilterCollapsePanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let {children, isOpen} = this.props

    return (
      <Collapse isOpen={isOpen}>
        {children}
        <hr style={{ marginTop: "-10px" }} />
      </Collapse>
    )
  }
}

export default FilterCollapsePanel
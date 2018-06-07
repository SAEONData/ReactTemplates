'use strict'

import React from 'react'

class FilterButtonsPanel extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    let { children } = this.props

    return (
      <>
        <div style={{ marginTop: "-15px", marginBottom: "-13px" }}>
          {children}
        </div>
        <hr />
      </>
    )
  }
}

export default FilterButtonsPanel
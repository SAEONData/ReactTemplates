'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

const filterButtonStyle = { marginLeft: "0px", marginRight: "0px", width: "100%" }

class FilterToggleButton extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    let { callback } = this.props
    if(typeof callback !== 'undefined'){
      callback()
    }
  }

  render() {

    let { label, size, color } = this.props

    size = globalFunctions.fixEmptyValue(size, "sm")
    color = globalFunctions.fixEmptyValue(color, "primary")

    return (
      <Button size={size} color={color} onClick={this.toggle} style={filterButtonStyle}>
        {label}
      </Button>
    )
  }
}

export default FilterToggleButton
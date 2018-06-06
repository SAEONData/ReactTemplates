'use strict'

import React from 'react'
import { Button } from 'mdbreact';

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

  fixEmptyValue(value, defaultValue) {
    if (typeof value === 'undefined') {
      return defaultValue
    }

    return value
  }

  render() {

    let { label, size, color, callback, children } = this.props

    size = this.fixEmptyValue(size, "sm")
    color = this.fixEmptyValue(color, "secondary")

    return (
      <Button size={size} color={color} onClick={this.toggle} style={filterButtonStyle}>
        {label}
      </Button>
    )
  }
}

export default FilterToggleButton
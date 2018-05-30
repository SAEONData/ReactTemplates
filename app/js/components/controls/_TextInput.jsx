'use strict'

import React from 'react'
import { Input, Tooltip } from 'mdbreact'

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value

class _TextInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: "" }
  }

  componentDidMount() {

    let { value } = this.props

    if (typeof value === 'undefined') {
      value = ""
    }

    this.setState({ value: value })
  }

  onChange(event) {

    //Update internal state
    this.setState({ value: event.target.value })

    let { callback } = this.props

    if (typeof callback !== 'undefined') {
      callback(event.target.value)
    }
  }

  render() {

    let { label, tooltip, allowEdit } = this.props
    let { value } = this.state

    return (
      <>
        <Tooltip
          placement="top"
          component="label"
          tooltipContent={tooltip}>
          <b>{label}</b>
        </Tooltip>

        <Input disabled={!allowEdit} size="sm" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "-25px", width: "100%", fontSize: "15px" }}
          onChange={this.onChange.bind(this)} hint="Type value here"
          value={value} />
      </>
    )
  }
}

export default _TextInput
'use strict'

import React from 'react'
import { Input, Tooltip } from 'mdbreact'
import TextareaAutosize from "react-textarea-autosize"

//Requires: react-textarea-autosize

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value

class TextAreaInput extends React.Component {

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

        {/* <Input disabled={!allowEdit} size="sm" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "-25px", width: "100%", fontSize: "15px" }}
          onChange={this.onChange.bind(this)} hint="Type value here"
          value={value} /> */}

        <TextareaAutosize
          readOnly={!allowEdit}
          style={{
            borderStyle: "solid",
            borderWidth: "0px 0px 1px 0px",
            borderColor: "#b4b4b4",
            paddingBottom: "4px",
            width: "100%"
          }}
          value={value}
          onChange={this.onChange.bind(this)}
        />
      </>
    )
  }
}

export default TextAreaInput
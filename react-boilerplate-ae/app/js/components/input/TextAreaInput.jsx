'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import TextareaAutosize from "react-textarea-autosize"
import * as globalFunctions from '../../globalFunctions'

//Requires: react-textarea-autosize

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class TextAreaInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: "" }
  }

  componentDidMount() {

    this.setInternalValue()
  }

  componentDidUpdate() {

    if (globalFunctions.isEmptyValue(this.state.value) && !globalFunctions.isEmptyValue(this.props.value)) {
      this.setInternalValue()
    }
  }

  setInternalValue() {

    let { value } = this.props

    if (globalFunctions.isEmptyValue(value)) {
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

    label = globalFunctions.fixEmptyValue(label, "Label:")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)

    return (
      <>
        <div hidden={tooltip === ""}>
          <Tooltip
            placement="top"
            component="label"
            tooltipContent={tooltip}>
            <b style={{ color: globalFunctions.getFontColour(allowEdit) }}>{label}</b>
          </Tooltip>
        </div>
        <div hidden={tooltip !== ""}>
          <b style={{ color: globalFunctions.getFontColour(allowEdit) }}>{label}</b>
        </div>

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
'use strict'

import React from 'react'
import { Button, Input, Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value

class TextInputWithApply extends React.Component {

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
  }

  onClick(filterValue, e) {

    let { callback } = this.props

    if (typeof callback !== 'undefined') {
      callback(filterValue)
    }
  }

  render() {

    let { label, tooltip, allowEdit } = this.props
    let { value } = this.state

    label = globalFunctions.fixEmptyValue(label, "Label:")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    value = globalFunctions.fixEmptyValue(value, "")

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

        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <Input disabled={!allowEdit} size="sm"
                  style={{ marginLeft: "0px", marginRight: "0px", marginTop: "-25px", width: "100%", fontSize: "15px" }}
                  onChange={this.onChange.bind(this)} hint="Type value here"
                  value={value} />
              </td>
              <td style={{ width: "1px" }}>
                <Button
                  disabled={!allowEdit}
                  color="primary"
                  size="sm"
                  style={{ height: "32px", marginTop: "-20px", marginRight: "0px" }}
                  onClick={this.onClick.bind(this, value)}>Apply</Button>
              </td>
            </tr>
          </tbody>
        </table>

      </>
    )
  }
}

export default TextInputWithApply
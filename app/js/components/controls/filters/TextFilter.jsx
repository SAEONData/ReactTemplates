'use strict'

import React from 'react'
import { Button, Input, Tooltip } from 'mdbreact'

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - filterCallback : callback to send filter value

class TextFilter extends React.Component {

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
  }

  onClick(filterValue, e) {

    let { filterCallback } = this.props

    if (typeof filterCallback !== 'undefined') {
      filterCallback(filterValue)
    }
  }

  render() {

    let { label, tooltip } = this.props
    let { value } = this.state

    return (
      <>
        <Tooltip 
          placement="top" 
          component="label" 
          tooltipContent={tooltip}> 
            <b>{label}</b>
        </Tooltip>
        
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <Input size="sm" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "-25px", width: "100%", fontSize: "15px" }}
                  onChange={this.onChange.bind(this)} hint="Type value here"
                  value={value} />
              </td>
              <td style={{ width: "1px" }}>
                <Button
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

export default TextFilter
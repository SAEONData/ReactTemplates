'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

import DatePicker from 'antd/lib/date-picker'
import moment from 'moment';
import '../../../css/antd.date-picker.css'
import '../../../css/antd.time-picker.css'
import '../../../css/antd.input.css'
//const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class DateInput extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
  }

  onChange(date, dateString) {

    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      callback(dateString)
    }
  }

  render() {

    let { label, tooltip, value, allowEdit } = this.props

    label = globalFunctions.fixEmptyValue(label, "Label:")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    value = globalFunctions.fixEmptyValue(value, new Date().toLocaleDateString("en-ZA", { year: 'numeric', month: 'numeric', day: 'numeric' }))

    return (
      <>
        <div style={{ marginBottom: "8px" }}>
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
        </div>

        <DatePicker
          disabled={!allowEdit}
          defaultValue={moment(value, 'YYYY/MM/DD')}
          style={{ width: "100%" }}
          onChange={this.onChange}
        />
      </>
    )
  }
}

export default DateInput
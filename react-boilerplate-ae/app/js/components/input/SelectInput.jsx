'use strict'

import React from 'react'
import { Select, SelectInput as MBDSelectInput, SelectOptions, SelectOption, Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - data : Data for list >> [{id: 1, text: "one"}, ...]
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class SelectInput extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.otherDropdownsClose = this.otherDropdownsClose.bind(this);

    this.state = { value: "" }
  }

  onClick(e) {

    // check if select is multiple
    if (e.target.dataset.multiple === 'true') {
      return;
    }

    if (e.target.classList.contains('select-dropdown')) {
      this.otherDropdownsClose();
      if (e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.classList.add('fadeIn')
      }
    }
    else {
      this.otherDropdownsClose();
    }
  }

  otherDropdownsClose() {
    let dropdowns = document.querySelectorAll('.dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains('fadeIn')) {
        dropdowns[i].classList.remove('fadeIn');
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
  }

  componentDidMount() {

    let { data } = this.props

    document.addEventListener('click', this.onClick);

    //Insert "no-selection" entry
    if (typeof data === 'undefined') {
      data = []
    }

    if (data.filter(d => d.text === "Select...").length === 0) {
      data.splice(0, 0, { id: 0, text: "Select..." })
    }

    this.setInternalValue()
  }

  componentDidUpdate() {

    if (globalFunctions.isEmptyValue(this.state.value) && !globalFunctions.isEmptyValue(this.props.value)) {
      this.setInternalValue()
    }
  }

  setInternalValue() {

    let { value } = this.props

    //Init state
    if (globalFunctions.isEmptyValue(value)) {
      value = ""
    }

    this.setState({ value: value })
  }

  onSelect(value) {

    this.setState({ value: value })

    let { callback, data } = this.props
    if (typeof callback !== 'undefined' && typeof data !== 'undefined') {

      let selectedDataItem = data.filter(d => d.text === value)[0]
      if (typeof selectedDataItem !== 'undefined') {
        if (selectedDataItem.id > 0) {
          callback({ id: selectedDataItem.id, text: value })
        }
        else {
          callback({ id: 0, text: "" })
        }
      }
    }
  }

  renderSelectOptions(data) {

    let listOptions = []

    if (typeof data !== 'undefined') {
      data.map(item => {
        if (typeof item.id !== 'undefined' && typeof item.text !== 'undefined') {
          listOptions.push(
            <SelectOption key={item.id} id={item.id} triggerOptionClick={this.onSelect.bind(this)}>{item.text}</SelectOption>
          )
        }
      })
    }
    else {
      listOptions.push(
        <SelectOption disabled key="001">No data supplied, please supply options data</SelectOption>
      )
    }

    return listOptions
  }

  render() {

    let { label, tooltip, data, allowEdit } = this.props
    let { value } = this.state

    if (typeof value === 'undefined' || value === "" || value === null) {
      value = "Select..."
    }

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

        <Select color="primary">
          <MBDSelectInput disabled={!allowEdit} style={{ height: "35px" }} value={value}></MBDSelectInput>
          <SelectOptions>
            {this.renderSelectOptions(data)}
          </SelectOptions>
        </Select>
      </>
    )
  }
}

export default SelectInput
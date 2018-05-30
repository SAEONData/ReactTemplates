'use strict'

import React from 'react'
import { Select, SelectInput, SelectOptions, SelectOption, Tooltip } from 'mdbreact';

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - selectedValue : String/text value
//  - data : Data for list >> [{id: 1, text: "one"}, ...]
//  - filterCallback : callback to send filter value

class _SelectInput extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.otherDropdownsClose = this.otherDropdownsClose.bind(this);

    this.state = { selectedValue: "" }
  }

  onClick(e) {

    // check if select is multiple
    if (e.target.dataset.multiple === 'true') {
      return;
    }

    if (e.target.classList.contains('select-dropdown')) {
      this.otherDropdownsClose();
      e.target.nextElementSibling.classList.add('fadeIn');
    } else {
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

    document.addEventListener('click', this.onClick);

    //Insert "no-selection" entry
    this.props.data.splice(0, 0, { id: 0, text: "Select..." })

    //Init state
    let { selectedValue } = this.props

    if (typeof selectedValue === 'undefined') {
      selectedValue = ""
    }

    this.setState({ selectedValue: selectedValue })
  }

  onSelect(value) {

    this.setState({ selectedValue: value })

    let { filterCallback, data } = this.props
    if (typeof filterCallback !== 'undefined' && typeof data !== 'undefined') {

      let selectedDataItem = data.filter(d => d.text === value)[0]
      if (typeof selectedDataItem !== 'undefined') {
        if (selectedDataItem.id > 0) {
          filterCallback({ id: selectedDataItem.id, text: value })
        }
        else {
          filterCallback({ id: 0, text: "" })
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

    return listOptions
  }

  render() {

    let { label, tooltip, data, allowEdit } = this.props
    let { selectedValue } = this.state

    if (typeof selectedValue === 'undefined' || selectedValue === "" || selectedValue === null) {
      selectedValue = "Select..."
    }

    return (
      <>
        <Tooltip
          placement="top"
          component="label"
          tooltipContent={tooltip}>
          <b>{label}</b>
        </Tooltip>

        <Select color="primary">
          <SelectInput disabled={!allowEdit} style={{ height: "35px" }} value={selectedValue}></SelectInput>
          <SelectOptions>
            {this.renderSelectOptions(data)}
          </SelectOptions>
        </Select>
      </>
    )
  }
}

export default _SelectInput
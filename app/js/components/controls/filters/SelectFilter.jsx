'use strict'

import React from 'react'
import { Select, SelectInput, SelectOptions, SelectOption } from 'mdbreact';

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - selectedValue : String/text value
//  - data : Data for list >> [{id: 1, text: "one"}, ...]
//  - filterCallback : callback to send filter value

class SelectFilter extends React.Component {

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
    if(typeof filterCallback !== 'undefined' && typeof data !== 'undefined'){

      let selectedDataItem = data.filter(d => d.text === value)[0]
      if(typeof selectedDataItem !== 'undefined'){

 
        filterCallback({id: selectedDataItem.id, value})
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

    let { label, tooltip, data } = this.props
    let { selectedValue } = this.state

    if(typeof selectedValue === 'undefined' || selectedValue === "" || selectedValue === null){
      selectedValue = "Select..."
    }

    return (
      <>
        <label data-tip={tooltip} style={{ fontWeight: "bold" }}>{label}</label>

        <Select color="primary">
          <SelectInput style={{ height: "35px" }} value={selectedValue}></SelectInput>
          <SelectOptions>
            {this.renderSelectOptions(data)}
          </SelectOptions>
        </Select>
      </>
    )
  }
}

export default SelectFilter
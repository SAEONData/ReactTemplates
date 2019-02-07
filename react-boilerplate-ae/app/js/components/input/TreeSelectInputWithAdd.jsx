'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

//AntD Tree-Select
import TreeSelect from 'antd/lib/tree-select'
import '../../../css/antd.tree-select.css' //Overrides default antd.tree-select css
import '../../../css/antd.select.css' //Overrides default antd.select css
const TreeSelectNode = TreeSelect.TreeNode;

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - data : Data for list >> 
//           [{id: 1, text: "Parent1", children: [{id: 11, text: "Child1"}, {id: 12, text: "Child2"}]}, {id: 2, text: "Parent2"}]
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class TreeSelectInputWithAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      search: "",
      _data: []
    }

    this.onEnterKey = this.onEnterKey.bind(this)
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onEnterKey(event) {

    if (event.keyCode == 13) {
      event.preventDefault()

      let { _data, search } = this.state
      _data.push({ id: this.getRandomInt(1000, 10000), text: search })
      this.setState({ _data, search: "" }, () => {
        this.setState({ value: search })
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEnterKey, false);
  }

  componentDidMount() {

    document.addEventListener("keydown", this.onEnterKey, false);
    this.setInternalValue()
    this.setState({ _data: this.props.data })
  }

  componentDidUpdate() {

    if (globalFunctions.isEmptyValue(this.state.value) && !globalFunctions.isEmptyValue(this.props.value)) {
      this.setInternalValue()
    }
  }

  setInternalValue() {
    //Init state
    let { value } = this.props

    if (globalFunctions.isEmptyValue(value)) {
      value = ""
    }

    this.setState({ value: value })
  }

  renderTreeSelectNodes(data) {

    if (typeof data !== 'undefined') {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeSelectNode value={item.text} title={item.text} key={item.id}>
              {this.renderTreeSelectNodes(item.children)}
            </TreeSelectNode>
          )
        }
        return <TreeSelectNode value={item.text} title={item.text} key={item.id} />
      })
    }
  }

  onChange(value, label, extra) {

    this.setState({ value: value })

    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      if (typeof extra.triggerNode !== 'undefined') {
        callback({ id: extra.triggerNode.props.eventKey, text: value })
      }
      else {
        callback({ id: 0, text: "" })
      }
    }
  }

  onSearch(value) {
    this.setState({ search: value })
  }

  render() {

    let { label, tooltip, allowEdit } = this.props
    let { _data, value, search } = this.state

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

        <TreeSelect
          disabled={!allowEdit}
          showSearch
          searchPlaceholder="Search..."
          style={{ width: "100%" }}
          value={value}
          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
          placeholder="Select..."
          allowClear
          onChange={this.onChange.bind(this)}
          searchValue={search}
          onSearch={this.onSearch.bind(this)}
        >
          {this.renderTreeSelectNodes(_data)}
        </TreeSelect>
      </>
    )
  }
}

export default TreeSelectInputWithAdd
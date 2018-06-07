'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact';

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

class TreeSelectInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: "" }
  }

  componentDidMount() {

    //Init state
    let { value } = this.props

    if (typeof value === 'undefined') {
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

  fixEmptyValue(value, defaultValue) {
    if (typeof value === 'undefined') {
      return defaultValue
    }

    return value
  }

  render() {

    let { label, tooltip, data, allowEdit } = this.props
    let { value } = this.state

    if (typeof value === 'undefined' || value === "" || value === null) {
      value = "Select..."
    }

    label = this.fixEmptyValue(label, "Label:")
    tooltip = this.fixEmptyValue(tooltip, "")
    allowEdit = this.fixEmptyValue(allowEdit, true)

    return (
      <>
        <div hidden={tooltip === ""}>
          <Tooltip
            placement="top"
            component="label"
            tooltipContent={tooltip}>
            <b>{label}</b>
          </Tooltip>
        </div>
        <div hidden={tooltip !== ""}>
          <b>{label}</b>
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
        >
          {this.renderTreeSelectNodes(data)}
        </TreeSelect>
      </>
    )
  }
}

export default TreeSelectInput
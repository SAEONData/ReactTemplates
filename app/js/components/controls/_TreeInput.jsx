'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact';

//AntD Tree
import Tree from 'antd/lib/tree'
import '../../../css/antd.tree.css' //Overrides default antd.tree css
const TreeNode = Tree.TreeNode

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - selectedValue : String/text value
//  - data : Data for list >> 
//           [{id: 1, text: "Parent1", children: [{id: 11, text: "Child1"}, {id: 12, text: "Child2"}]}, {id: 2, text: "Parent2"}]
//  - callback : callback to send filter value

class _TreeInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = { selectedKeys: [], expandedKeys: [] }
  }

  FindDataItem(data, text) {
    if (!data) { return }

    for (const item of data) {
      // Test current object
      if (item.text === text) { return item; }

      // Test children recursively
      const child = this.FindDataItem(item.children, text);
      if (child) { return child }
    }
  }

  FindParentKeys(data, id) {
    let keys = []
    if (!data) { return keys }

    for (const item of data) {
      // Test current object
      if (item.id === id) {
        keys.push(item.id.toString())
      }

      // Test children recursively
      let subKeys = this.FindParentKeys(item.children, id)

      if (subKeys.length > 0) {
        keys.push(item.id.toString(), ...subKeys)
      }
    }

    return keys
  }

  componentDidMount() {

    //Init state
    let { selectedValue, data } = this.props

    if (typeof selectedValue !== 'undefined') {

      let dataItem = this.FindDataItem(data, selectedValue)
      if (typeof dataItem !== 'undefined') {
        this.setState({
          selectedKeys: [dataItem.id.toString()],
          expandedKeys: this.FindParentKeys(data, dataItem.id).filter(x => x !== dataItem.id.toString())
        })
      }
    }
  }

  renderTreeNodes(data) {

    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.text} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.text} key={item.id} />
    })
  }

  onSelect(selectedKeys, info) {

    this.setState({ selectedKeys })

    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      if (info.selected === true) {
        callback({ id: parseInt(info.node.props.eventKey), text: info.node.props.title })
      }
      else {
        callback({ id: 0, text: "" })
      }
    }
  }

  onExpand(expandedKeys) {
    this.setState({ expandedKeys })
  }

  render() {

    let { label, tooltip, data, allowEdit } = this.props
    let { selectedKeys, expandedKeys } = this.state

    return (
      <>
        <Tooltip
          placement="top"
          component="label"
          tooltipContent={tooltip}>
          <b>{label}</b>
        </Tooltip>

        <Tree
          disabled={!allowEdit}
          onSelect={this.onSelect.bind(this)}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onExpand={this.onExpand.bind(this)}>
          {this.renderTreeNodes(data)}
        </Tree>
      </>
    )
  }
}

export default _TreeInput
'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Button, Collapse } from 'mdbreact';
import ActiveFilters from '../sections/ActiveFilters.jsx'

//Filter input components
import SelectInput from '../input/SelectInput.jsx'
import TextInputWithApply from '../input/TextInputWithApply.jsx'
import TreeInput from '../input/TreeInput.jsx'
import TreeSelectInput from '../input/TreeSelectInput.jsx'
//Filter input components

const mapStateToProps = (state, props) => {
  let { filters: { activeFilters } } = state
  return { activeFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (key, value) => {
      dispatch({ type: "SET_FILTER", payload: { key, value } })
    },
    clearFilters: () => {
      dispatch({ type: "CLEAR_FILTERS", payload: {  } })
    }
  }
}

class Filters extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.getFilterValue = this.getFilterValue.bind(this)
    this.getFilterKey = this.getFilterKey.bind(this)

    this.state = {
      collapse: false,
    };
  }

  // componentDidUpdate() {
  //   console.log("Active filters:", ...this.props.activeFilters)
  // }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  setTextFilter(key, value) {
    if (typeof key !== 'undefined' && typeof value !== 'undefined') {
      this.props.setFilter(key, value)
    }
  }

  setListFilter(key, value) {
    if (typeof key !== 'undefined' && typeof value !== 'undefined') {
      this.props.setFilter(key, value.text)
    }
  }

  getFilterValue(key) {

    let { activeFilters } = this.props
    let value = ""

    let filterItem = activeFilters.filter(x => x.key === key)[0]
    if (typeof filterItem !== 'undefined') {
      value = filterItem.value
    }

    return value
  }

  getFilterKey(key) {
    return key + "_" + this.getFilterValue(key)
  }

  clearFilters() {
    this.props.clearFilters()
  }

  render() {

    let { activeFilters } = this.props
    let filterButtonStyle = { marginLeft: "0px", width: "100%" }

    return (
      <>
        <ActiveFilters />

        <hr />
        
        <div className="row" style={{ marginTop: "-15px", marginBottom: "-13px" }}>
          <div className="col-md-3">
            {/* This is an example filter toggle button */}
            <Button size="sm" color="secondary" onClick={this.toggle} style={filterButtonStyle}>Toggle Example filters</Button>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <Button size="sm" color="warning" onClick={this.clearFilters.bind(this)} style={filterButtonStyle}>Clear Filters</Button>
          </div>
        </div>
        <hr />

        {/* This is an example collapsable filter panel */}
        <Collapse isOpen={this.state.collapse}>

          <div className="row">
            <div className="col-md-4">
              <TextInputWithApply
                key={this.getFilterKey("text")}
                label="Example text filter:"
                callback={this.setTextFilter.bind(this, "text")}
                value={this.getFilterValue("text")}
              />
            </div>
            <div className="col-md-4">
              <SelectInput
                key={this.getFilterKey("list")}
                label="Example select/list filter:"
                callback={this.setListFilter.bind(this, "list")}
                data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
                value={this.getFilterValue("list")}
              />
            </div>
            <div className="col-md-4">
              <TreeSelectInput
                key={this.getFilterKey("tree")}
                label="Example tree-select filter:"
                callback={this.setListFilter.bind(this, "tree")}
                data={[{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]}
                value={this.getFilterValue("tree")}
              />
            </div>
          </div>

          <hr style={{ marginTop: "-10px" }} />
        </Collapse>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
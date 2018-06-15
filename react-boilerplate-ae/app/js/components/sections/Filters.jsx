'use strict'

import React from 'react'
import { Row, Col } from 'mdbreact'
import { connect } from 'react-redux'
import ActiveFilters from '../sections/ActiveFilters.jsx'
import FilterToggleButton from '../input/FilterToggleButton.jsx'
import FilterButtonsPanel from '../layout/FilterButtonsPanel.jsx'
import FilterCollapsePanel from '../layout/FilterCollapsePanel.jsx'
import * as globalFunctions from '../../globalFunctions'

//Filter input components
import SelectInput from '../input/SelectInput.jsx'
import TextInputWithApply from '../input/TextInputWithApply.jsx'
import TreeInput from '../input/TreeInput.jsx'
import TreeSelectInput from '../input/TreeSelectInput.jsx'
//Filter input components

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
  let { filters: { data, activeFilters } } = state
  return { data, activeFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filtersLoad: payload => {
      dispatch({ type: "FILTERS_LOAD", payload })
    },
    setFilter: (key, value) => {
      dispatch({ type: "SET_FILTER", payload: { key, value } })
    },
    clearFilters: () => {
      dispatch({ type: "CLEAR_FILTERS", payload: null })
    },
    resetBatchCount: () => {
      dispatch({ type: "RESET_BATCH_COUNT", payload: null })
    },
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    }
  }
}

class Filters extends React.Component {

  constructor(props) {
    super(props);
    this.getFilterValue = this.getFilterValue.bind(this)
    this.getFilterKey = this.getFilterKey.bind(this)

    this.state = { collapse: "" };
    this.processURLFilters()
  }

  componentDidMount() {
    this.getData() 
  }

  processURLFilters(){

    //Read filters from URL
    const parsedHash = globalFunctions.readFiltersFromURL()
    
    //Process URL filters
    Object.keys(parsedHash).forEach(key => {

      //Replace with less hardcoded method eventually.
      //When filters are loaded from config/data this should be more doable.
      const validFilters = ["text", "list", "tree"] 

      if (validFilters.filter(x => x === key) != null) {
        this.props.setFilter(key, parsedHash[key])
      }
    })
  }

  getData() {

    let { setLoading, filtersLoad } = this.props
    let data = []

    //Toggle loading panel on
    setLoading(true)

    //#######################################################################//
    //Replace sample data with your own data fetched from an API or elsewhere//
    //#######################################################################//

    //Sample data
    data.push("unused value 1")
    data.push("unused value 2")

    //Toggle loading panel off (remember to do this when you have received your data)
    setLoading(false)

    //return data
    filtersLoad(data)
  }

  toggle(value) {

    if (this.state.collapse !== value) {
      this.setState({ collapse: value });
    }
    else {
      this.setState({ collapse: "" });
    }
  }

  setTextFilter(key, value) {
    if (typeof key !== 'undefined' && typeof value !== 'undefined') {
      this.props.resetBatchCount()
      this.props.setFilter(key, value)
    }
  }

  setListFilter(key, value) {
    if (typeof key !== 'undefined' && typeof value !== 'undefined') {
      this.props.resetBatchCount()
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
    if (this.props.activeFilters.length > 0) {
      this.props.resetBatchCount()
      this.props.clearFilters()
    }
  }

  render() {

    let { data } = this.props

    return (
      <>
        <ActiveFilters />
        <hr />

        {/*
        ##################################################
        Change the code below by creating your own toggle 
        buttons and corresponding collapse areas.
        ##################################################
        */}

        <FilterButtonsPanel>
          <Row>
            <Col md="3">
              {/* 
              ########################################
              This is an example filter toggle button.
              Replace with your own.
              ########################################
              */}
              <FilterToggleButton label="Toggle example filters" callback={this.toggle.bind(this, "#1")} />
            </Col>
            <Col md="3">
              <FilterToggleButton label="Toggle non-existing filters" callback={this.toggle.bind(this, "#2")} />
            </Col>
            <Col md="3">
              {/* Nothing here yet */}
            </Col>
            <Col md="3">
              {/* Please keep this button  */}
              <FilterToggleButton label="Clear Filters" color="secondary" callback={this.clearFilters.bind(this)} />
            </Col>
          </Row>
        </FilterButtonsPanel>

        {/* 
        ###############################################################
        This is an example collapsable (filter) panel. 
        Replace with your own.
        Make use of the filter-input components to simplify your work.
        ###############################################################
        */}
        <FilterCollapsePanel isOpen={this.state.collapse === "#1"}>
          <Row>
            <Col md="4">
              <TextInputWithApply
                key={this.getFilterKey("text")}
                label="Example text filter:"
                callback={this.setTextFilter.bind(this, "text")}
                value={this.getFilterValue("text")}
              />
            </Col>
            <Col md="4">
              <SelectInput
                key={this.getFilterKey("list")}
                label="Example select/list filter:"
                callback={this.setListFilter.bind(this, "list")}
                data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
                value={this.getFilterValue("list")}
              />
            </Col>
            <Col md="4">
              <TreeSelectInput
                key={this.getFilterKey("tree")}
                label="Example tree-select filter:"
                callback={this.setListFilter.bind(this, "tree")}
                data={[{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]}
                value={this.getFilterValue("tree")}
              />
            </Col>
          </Row>
        </FilterCollapsePanel>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
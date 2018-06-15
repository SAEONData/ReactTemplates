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
import DateInput from '../input/DateInput.jsx'
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
    this.generateFilters = this.generateFilters.bind(this)

    this.state = { collapse: "" };
    this.processURLFilters()
  }

  componentDidMount() {
    this.getData()
  }

  processURLFilters() {

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
    //The end result data needs to be an array of: {type, key, label, data}  //
    //#######################################################################//

    //Text filter example
    data.push({
      type: "text",
      key: "textFilter",
      label: "Example text filter:",
      data: []
    })

    //Select filter example
    data.push({
      type: "select",
      key: "selectFilter",
      label: "Example select filter:",
      data: [{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]
    })

    //Tree-select filter example
    data.push({
      type: "tree-select",
      key: "treeSelectFilter",
      label: "Example tree-select filter:",
      data: [{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]
    })

    //Tree filter example
    data.push({
      type: "tree",
      key: "treeFilter",
      label: "Example tree filter:",
      data: [{ id: 1, text: "Parent1", children: [{ id: 11, text: "Child1", children: [{ id: 111, text: "SubChild1" }] }, { id: 12, text: "Child2" }] }, { id: 2, text: "Parent2" }]
    })

    //Date filter example
    data.push({
      type: "date",
      key: "dateFilter",
      label: "Example date filter:",
      data: []
    })

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

  setFilter(key, value) {

    let { resetBatchCount, setFilter } = this.props

    if (typeof key !== 'undefined' && typeof value !== 'undefined') {

      resetBatchCount()

      if (typeof value === 'string') {
        setFilter(key, value)
      }
      else if (typeof value.id !== 'undefined' && typeof value.text !== 'undefined') {
        setFilter(key, value.text)
      }
    }

  }

  getFilterKey(key) {
    return key + "_" + this.getFilterValue(key)
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

  clearFilters() {
    if (this.props.activeFilters.length > 0) {
      this.props.resetBatchCount()
      this.props.clearFilters()
    }
  }

  generateFilters() {

    let { data } = this.props
    let filters = []

    data.forEach(item => {

      switch (item.type) {

        case "text":
          filters.push(
            <TextInputWithApply
              key={this.getFilterKey(item.key)}
              label={item.label}
              callback={this.setFilter.bind(this, item.key)}
              value={this.getFilterValue(item.key)}
            />
          )
          break;

        case "select":
          filters.push(
            <SelectInput
              key={this.getFilterKey(item.key)}
              label={item.label}
              callback={this.setFilter.bind(this, item.key)}
              value={this.getFilterValue(item.key)}
              data={item.data}
            />
          )
          break;

        case "tree":
          filters.push(
            <TreeInput
              key={this.getFilterKey(item.key)}
              label={item.label}
              callback={this.setFilter.bind(this, item.key)}
              value={this.getFilterValue(item.key)}
              data={item.data}
            />
          )
          break;

        case "tree-select":
          filters.push(
            <TreeSelectInput
              key={this.getFilterKey(item.key)}
              label={item.label}
              callback={this.setFilter.bind(this, item.key)}
              value={this.getFilterValue(item.key)}
              data={item.data}
            />
          )
          break;

        case "date":
          filters.push(
            <DateInput
              key={this.getFilterKey(item.key)}
              label={item.label}
              callback={this.setFilter.bind(this, item.key)}
              value={this.getFilterValue(item.key)}
            />
          )
          break;
      }
    })

    return filters

  }

  render() {

    let filters = this.generateFilters()

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
              <FilterToggleButton label="Toggle more example filters" callback={this.toggle.bind(this, "#2")} />
            </Col>
            <Col md="3">
              {/* Nothing here */}
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
              {filters[0]}
            </Col>
            <Col md="4">
              {filters[1]}
            </Col>
            <Col md="4">
              {filters[2]}
            </Col>
          </Row>
        </FilterCollapsePanel>

        <FilterCollapsePanel isOpen={this.state.collapse === "#2"}>
          <Row>
            <Col md="4">
              {filters[3]}
            </Col>
            <Col md="4">
              {filters[4]}
            </Col>
            <Col md="4">
              {/* Nothing here */}
            </Col>
          </Row>
        </FilterCollapsePanel>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
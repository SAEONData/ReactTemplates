'use strict'

// Import React Table
import ReactTable from "react-table";
//import "react-table/react-table.css";

import React from 'react'
import { connect } from 'react-redux'
import { fixEmptyValue } from '../../globalFunctions'

import TextInput from '../input/TextInput.jsx'
import DateInput from '../input/DateInput.jsx'
import SelectInput from '../input/SelectInput.jsx'

const _ = require('lodash')

//Get test data
const testData = require('../../../data/tableViewData.js')

const mapStateToProps = (state, props) => {
  let { tableView: { data } } = state
  return { data }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    tableviewLoad: payload => {
      dispatch({ type: "TABLEVIEW_LOAD", payload })
    }
  }
}

class TableView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultSortedId: "Surname",
      defaultSortedDir: "DESC"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    this.getData()
  }

  getData() {

    let { tableviewLoad } = this.props
    tableviewLoad(testData.data)
  }

  GetDataType(data, key) {
    if (typeof data !== 'undefined' && data.length > 0) {
      return data[0][key]
    }

    return "string"
  }

  IsDate(value) {
    return !isNaN(Date.parse(value))
  }

  IsNumeric(value) {
    return !isNaN(value) && value.toString().trim() !== ""
  }

  filterMethodDate(filter, row, value) {

    let fromDate = this.IsDate(filter.value.from) ? new Date(filter.value.from) : new Date("1900", "01", "01")
    let toDate = this.IsDate(filter.value.to) ? new Date(filter.value.to) : new Date("2199", "12", "31")

    if (this.IsDate((value))) {
      value = new Date(value)
      return (value >= fromDate && value <= toDate)
    }
    return false
  }

  FilterDate(filter, row, onChange) {
    if (typeof filter === 'undefined' || filter.value === 'undefined') {
      filter = { value: { from: "", to: "" } }
    }

    return (
      <div>
        <div style={{ marginBottom: "2px", marginTop: "-1px" }}>
          <DateInput
            placeholder={"From"}
            callback={dateString => onChange({ ...filter.value, from: dateString })}
          />
        </div>
        <div style={{ marginBottom: "-2px" }}>
          <DateInput
            placeholder={"To"}
            callback={dateString => onChange({ ...filter.value, to: dateString })}
          />
        </div>
      </div>
    )
  }

  filterMethodNumber(filter, row, value) {
    let fromNum = this.IsNumeric(filter.value.from) ? Number(filter.value.from) : Number.MIN_VALUE
    let toNum = this.IsNumeric(filter.value.to) ? Number(filter.value.to) : Number.MAX_VALUE

    if (this.IsNumeric((value))) {
      value = Number(value)
      return (value >= fromNum && value <= toNum)
    }
    return false
  }

  FilterNumber(filter, row, onChange) {
    if (typeof filter === 'undefined' || filter.value === 'undefined') {
      filter = { value: { from: "", to: "" } }
    }

    return (
      <div>
        <div>
          <TextInput
            callback={text => onChange({ ...filter.value, from: text })}
            type="number"
            hint="From"
            width="90%"
            height="24.5px"
          />
        </div>
        <div style={{ marginTop: "27px", marginBottom: "-30px" }}>
          <TextInput
            callback={text => onChange({ ...filter.value, to: text })}
            type="number"
            hint="To"
            width="90%"
            height="24.5px"
          />
        </div>
      </div>
    )
  }

  filterMethodSelect(filter, row, value) {
    return true
  }

  FilterSelect(filter, row, onChange) {
    return (
      // <div style={{zIndex: "0"}}>
      // <SelectInput
      //   callback={selectedItem => onChange(selectedItem.text)}
      //   data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
      // />
      // </div>

      <div className="row">
        <div className="col-md-12">
          <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>

      //   <SelectInput
      //   label="Make a selection:"
      //   tooltip="Make a selection below"
      //   value=""
      //   data={[{ id: 1, text: "One" }, { id: 2, text: "Two" }, { id: 3, text: "Three" }]}
      //   callback={this.selectCallbackHandler.bind(this)}
      //   allowEdit={allowEdit}
      // />
    )
  }

  filterMethodString(filter, row, value) {
    if (filter.value === "" || _.isEqual(filter.value, { from: "", to: "" })) {
      return true
    }
    else {
      try {
        return row[filter.id].toString().toLowerCase().indexOf(filter.value.toLowerCase()) >= 0
      } catch (error) {
        return false
      }
    }
  }

  FilterString(filter, row, onChange) {
    return (
      <TextInput
        callback={text => onChange(text)}
        value={filter ? filter.value : ""}
        width="90%"
        height="24.5px"
      />
    )
  }

  setupColumns(data) {
    let columns = []

    if (typeof data !== 'undefined' && data.length > 0) {

      Object.keys(data[0]).map(key => {
        columns.push({
          Header: key,
          accessor: key,
          headerStyle: { textAlign: "left", fontWeight: "bold" },

          filterMethod: (filter, row) => {

            let value = row[filter.id]
            let type = this.GetDataType(data, key)
            switch (type) {
              case "date":
                return this.filterMethodDate(filter, row, value)

              case "number":
                return this.filterMethodNumber(filter, row, value)

              case "select":
                return this.filterMethodSelect(filter, row, value)

              default:
                return this.filterMethodString(filter, row, value)
            }
          },

          Filter: ({ filter, row, onChange }) => {

            let type = this.GetDataType(data, key)
            switch (type) {
              case "date":
                return this.FilterDate(filter, row, onChange)

              case "number":
                return this.FilterNumber(filter, row, onChange)

              case "select":
                return this.FilterSelect(filter, row, onChange)

              default:
                return this.FilterString(filter, row, onChange)
            }
          }
        })
      })
    }

    return columns
  }

  render() {

    let { data, filterable } = this.props
    let { defaultSortedId, defaultSortedDir } = this.state

    filterable = fixEmptyValue(filterable, true)

    if (data.length > 0) {
      return (
        <div>
          <br />
          <ReactTable
            data={data.slice(1)}
            showPagination={false}
            filterable={filterable}
            defaultFilterMethod={(filter, row) => row[filter.id].toString().toLowerCase().indexOf(filter.value.toLowerCase()) >= 0}
            columns={this.setupColumns(data)}
            defaultPageSize={data.length}
            defaultSorted={[{ id: defaultSortedId, desc: (defaultSortedDir == "ASC") }]}
            className="-striped -highlight"
          />
        </div>
      )
    }
    else {
      return (
        < div >
          <br />
          &nbsp;No data found
        </div >
      )
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableView)